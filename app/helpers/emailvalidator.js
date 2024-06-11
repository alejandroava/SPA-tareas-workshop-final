export function EmailValidator(email) {
    const at = email.indexOf('@')
    const dot = email.lastIndexOf('.')
    return at > 0 && dot > at + 1 && dot < email.length - 1;
}
