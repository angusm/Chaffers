export default function formatModifierForDisplay(modifier) {
    if (modifier > 0) {
        return '+' + modifier;
    }
    else {
        return String(modifier);
    }
}