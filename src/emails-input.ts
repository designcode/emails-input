import './styles/index.scss';
import { createElement } from './helpers/createElement';
import { isValidEmail } from './helpers/isValidEmail';

export interface EmailsInputOptions {
  placeholder: string;
}

export interface EmailAddresses {
  email: string;
  valid: boolean;
}

class EmailsInput {
  element: HTMLElement;

  constructor(element: HTMLElement, options?: EmailsInputOptions) {
    this.element = element;
    const emailInput = createElement('input', {
      attributes: {
        'type': 'text',
        'placeholder': options?.placeholder || 'add more people'
      },
      classNames: ['email-pill'],
      events: {
        'keydown': this.onInput.bind(this),
        'blur': this.onBlur.bind(this),
        'paste': this.onPaste.bind(this),
      }
    });

    element.classList.add('emails-input');
    element.addEventListener('click', () => {
      (element.children[element.children.length - 1] as HTMLInputElement).focus();
    });
    element.appendChild(emailInput);
  }

  get emailElements(): HTMLElement[] {
    const emailElements = Array.prototype.slice.call(this.element.children);
    emailElements.pop();

    return emailElements;
  }

  get value(): EmailAddresses [] {
    const emailAddresses = this.emailElements.map(
      (emailElement: HTMLElement) => ({
        email: emailElement.children[0].innerHTML,
        valid: emailElement.classList.contains('valid-pill')
      })
    );

    return emailAddresses;
  }

  get valid(): boolean {
    return this.emailElements.every(
      (emailElement: HTMLElement) => emailElement.classList.contains('valid-pill')
    );
  }

  getValue(): EmailAddresses [] {
    return this.value;
  }

  addEmail(email: string): void {
    this.setEmail(email);
  }

  private onInput(event: Event): void {
    const isFinished = ((event as KeyboardEvent).keyCode === 13 || (event as KeyboardEvent).keyCode === 188);
    const emailElement = (event.target as HTMLInputElement);
    if( isFinished && emailElement.value !== '') {
      event.preventDefault();
      this.setEmail(emailElement.value);
      emailElement.value = '';
    }
  }

  private onPaste(event: Event): void {
    // Things we do to make it work on IE :)
    setTimeout(() => {
      const emailElement = (event.target as HTMLInputElement);
      const emails = emailElement.value.split(',');
      emails.forEach((email: string) => this.setEmail(email.trim()));
      emailElement.value = '';
    });
  }

  private onBlur(event: Event): void {
    const emailElement = (event.target as HTMLInputElement);
    if (emailElement.value !== '') {
      this.setEmail(emailElement.value);
      emailElement.value = '';
    }
  }
  
  private setEmail(email: string): void {
    const isValid = isValidEmail(email);

    const emailPill = createElement('span', {
      events: {
        'click': (event: Event) => {
          event.stopPropagation()
        }
      },
      classNames: ['email-pill', isValid ? 'valid-pill' : 'invalid-pill']
    });
    emailPill.innerHTML = `<span>${email}</span>`;

    const emailPillDeleteButton = createElement('a', {
      classNames: ['email-pill-delete'],
      events: {
        click: (event: Event) => {
          const emailPillToDelete = (event.target as HTMLElement).parentNode;
          if(emailPillToDelete && emailPillToDelete.parentNode) {
            emailPillToDelete.parentNode.removeChild(emailPillToDelete);
          }
        }
      }
    });
    emailPillDeleteButton.innerHTML = 'x';
    emailPill.appendChild(emailPillDeleteButton);

    this.element.insertBefore(emailPill, this.element.lastChild);
  }
}

export default EmailsInput;
