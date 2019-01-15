// got this from https://stackoverflow.com/a/9090128, tidied it up somewhat
export function transitionEndEventName(el) {
    const transitions = {
        transition: 'transitionend',
        OTransition: 'otransitionend', // oTransitionEnd in very old Opera
        MozTransition: 'transitionend',
        WebkitTransition: 'webkitTransitionEnd'
    };
    for (const t in transitions) {
        if (transitions.hasOwnProperty(t) && el.style[t] !== undefined) {
            return transitions[t];
        }
    }
    throw new Error('TransitionEnd event is not supported in this browser');
}
