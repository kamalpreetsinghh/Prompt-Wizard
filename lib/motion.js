export const container = {
  visible: {
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

export const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export const fade = {
  initial: { opacity: 0, scale: 0.95, x: 40 },
  animate: { opacity: 1, scale: 1, x: 0 },
  transition: {
    duration: 0.5,
    delay: 0.2,
    ease: [0, 0.71, 0.2, 1.01],
  },
};

export const fadeRight = {
  initial: { opacity: 0, scale: 0.95, x: -40 },
  animate: { opacity: 1, scale: 1, x: 0 },
  transition: {
    duration: 0.5,
    delay: 0.2,
    ease: [0, 0.71, 0.2, 1.01],
  },
};
