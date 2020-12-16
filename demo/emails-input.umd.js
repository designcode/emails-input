(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.EmailsInput = factory());
}(this, (function () { 'use strict';

    var createElement = function (elementName, elementOptions) {
        var element = document.createElement(elementName);
        var attributes = (elementOptions === null || elementOptions === void 0 ? void 0 : elementOptions.attributes) || {};
        var classNames = (elementOptions === null || elementOptions === void 0 ? void 0 : elementOptions.classNames) || [];
        var events = (elementOptions === null || elementOptions === void 0 ? void 0 : elementOptions.events) || {};
        Object.keys(attributes).forEach(function (attribute) { return element.setAttribute(attribute, attributes[attribute]); });
        classNames.forEach(function (className) { return element.classList.add(className); });
        Object.keys(events).forEach(function (event) { return element.addEventListener(event, events[event]); });
        return element;
    };

    var isValidEmail = function (email) {
        var reg = /^([A-Za-z0-9_\-\.\+])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        return reg.test(email);
    };

    var EmailsInput = /** @class */ (function () {
        function EmailsInput(element, options) {
            this.element = element;
            var emailInput = createElement('input', {
                attributes: {
                    'type': 'text',
                    'placeholder': (options === null || options === void 0 ? void 0 : options.placeholder) || 'add more people'
                },
                classNames: ['email-pill'],
                events: {
                    'keydown': this.onInput.bind(this),
                    'blur': this.onBlur.bind(this),
                    'paste': this.onPaste.bind(this),
                }
            });
            element.classList.add('emails-input');
            element.addEventListener('click', function () {
                element.children[element.children.length - 1].focus();
            });
            element.appendChild(emailInput);
        }
        Object.defineProperty(EmailsInput.prototype, "emailElements", {
            get: function () {
                var emailElements = Array.prototype.slice.call(this.element.children);
                emailElements.pop();
                return emailElements;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EmailsInput.prototype, "value", {
            get: function () {
                var emailAddresses = this.emailElements.map(function (emailElement) { return ({
                    email: emailElement.children[0].innerHTML,
                    valid: emailElement.classList.contains('valid-pill')
                }); });
                return emailAddresses;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EmailsInput.prototype, "valid", {
            get: function () {
                return this.emailElements.every(function (emailElement) { return emailElement.classList.contains('valid-pill'); });
            },
            enumerable: false,
            configurable: true
        });
        EmailsInput.prototype.getValue = function () {
            return this.value;
        };
        EmailsInput.prototype.addEmail = function (email) {
            this.setEmail(email);
        };
        EmailsInput.prototype.onInput = function (event) {
            var isFinished = (event.keyCode === 13 || event.keyCode === 188);
            var emailElement = event.target;
            if (isFinished && emailElement.value !== '') {
                event.preventDefault();
                this.setEmail(emailElement.value);
                emailElement.value = '';
            }
        };
        EmailsInput.prototype.onPaste = function (event) {
            var _this = this;
            // Things we do to make it work on IE :)
            setTimeout(function () {
                var emailElement = event.target;
                var emails = emailElement.value.split(',');
                emails.forEach(function (email) { return _this.setEmail(email.trim()); });
                emailElement.value = '';
            });
        };
        EmailsInput.prototype.onBlur = function (event) {
            var emailElement = event.target;
            if (emailElement.value !== '') {
                this.setEmail(emailElement.value);
                emailElement.value = '';
            }
        };
        EmailsInput.prototype.setEmail = function (email) {
            var isValid = isValidEmail(email);
            var emailPill = createElement('span', {
                events: {
                    'click': function (event) {
                        event.stopPropagation();
                    }
                },
                classNames: ['email-pill', isValid ? 'valid-pill' : 'invalid-pill']
            });
            emailPill.innerHTML = "<span>" + email + "</span>";
            var emailPillDeleteButton = createElement('a', {
                classNames: ['email-pill-delete'],
                events: {
                    click: function (event) {
                        var emailPillToDelete = event.target.parentNode;
                        if (emailPillToDelete && emailPillToDelete.parentNode) {
                            emailPillToDelete.parentNode.removeChild(emailPillToDelete);
                        }
                    }
                }
            });
            emailPillDeleteButton.innerHTML = 'x';
            emailPill.appendChild(emailPillDeleteButton);
            this.element.insertBefore(emailPill, this.element.lastChild);
        };
        return EmailsInput;
    }());

    return EmailsInput;

})));
