import './scss/style.scss';

type SignupFormData = {
    email: string;
};

type SignupFormElements = {
    form: HTMLFormElement;
    emailInput: HTMLInputElement;
    emailError: HTMLElement;
    signUpTitle: HTMLHeadingElement;
};

const modal = document.querySelector('.modal') as HTMLDialogElement;
const modalEmail = modal.querySelector('.modal__email') as HTMLElement;
const modalCloseButton = modal.querySelector('.modal__btn') as HTMLButtonElement;
const allEmailInputs = document.querySelectorAll('.header__input, .get__input') as NodeListOf<HTMLInputElement>;

const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;


const closeModal = (): void => {
    modalEmail.textContent = '';
    allEmailInputs.forEach(input => {
        input.value = '';
        input.classList.remove('email-input-success');
    });
    modal.close();
    
    const signUpTitleId = modal.dataset.signUpTitleId;
    const targetTitle = document.getElementById(signUpTitleId!) as HTMLHeadingElement;
    targetTitle?.focus();
    delete modal.dataset.signUpTitleId;
}

const handleEscape = (e: KeyboardEvent): void => {
    if (e.key === 'Escape' && modal.open) {
        closeModal();
    }
}

document.addEventListener('keydown', handleEscape);
document.addEventListener('DOMContentLoaded', () => {
    allEmailInputs.forEach(input => {
        input.value = '';
    });
});

const setupSignupForm = ({
    form,
    emailInput,
    emailError, 
    signUpTitle 
}: SignupFormElements): void => {

    const handleSubmit = (e: Event): void => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const {email} = Object.fromEntries(formData.entries()) as SignupFormData;
        const cleanEmail = email.trim().toLowerCase();

        if (!cleanEmail || !emailPattern.test(cleanEmail)) {
            emailError.textContent = 'Valid email required';
            emailInput.classList.add('email-input-error');
            emailInput.classList.remove('email-input-success');
            return;
        }

        modalEmail.textContent = cleanEmail;
        modal.dataset.signUpTitleId = signUpTitle.id;
        modal.showModal();
        modal.focus();
    }

    const removeError = (): void => {
        emailError.textContent = '';
        emailInput.classList.remove('email-input-error');
    }

    const checkInput = (): void => {
        const emailValue = emailInput.value.trim().toLowerCase();

        if (emailValue && emailPattern.test(emailValue)) {
            removeError();
            emailInput.classList.add('email-input-success');
        }
    }

    form.addEventListener('submit', handleSubmit);
    emailInput.addEventListener('input', checkInput);
    emailInput.addEventListener('blur', removeError);
    modalCloseButton.addEventListener('click', closeModal);
}

// Set up first form 
setupSignupForm({
    form: document.querySelector('.header__form') as HTMLFormElement,
    emailInput: document.getElementById('header-email') as HTMLInputElement,
    emailError: document.getElementById('header-email-error') as HTMLElement,
    signUpTitle: document.getElementById('header-title') as HTMLHeadingElement
});

// Set up second form
setupSignupForm({
    form: document.querySelector('.get__form') as HTMLFormElement,
    emailInput: document.getElementById('get-email') as HTMLInputElement,
    emailError: document.getElementById('get-email-error') as HTMLElement,
    signUpTitle: document.getElementById('get-early') as HTMLHeadingElement
});