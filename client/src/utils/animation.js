export const animationUtil = {
  createController: (frames, onFrameChange, fps = 30) => {
    let rafId = null;
    let currentFrame = 0;
    let lastTime = 0;
    const interval = 1000 / fps;

    const loop = (time) => {
      if (time - lastTime >= interval) {
        currentFrame = (currentFrame + 1) % frames.length;
        onFrameChange(currentFrame);
        lastTime = time;
      }
      rafId = requestAnimationFrame(loop);
    };

    return {
      play: () => {
        if (!rafId) {
          lastTime = performance.now();
          rafId = requestAnimationFrame(loop);
        }
      },
      pause: () => {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      },
      seek: (frameIndex) => {
        currentFrame = frameIndex;
        onFrameChange(currentFrame);
      },
    };
  },
};
