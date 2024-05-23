export const delay = async (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const screenAnimTransition = { duration: .5, ease: "easeInOut" };

export const screenReducedTransiton = { duration: 0, ease: "linear" };