const requestedImages = new Set();

const runWhenIdle = (callback) => {
  if (typeof window === "undefined") {
    return;
  }

  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(callback, { timeout: 1200 });
    return;
  }

  window.setTimeout(callback, 50);
};

export const preloadCardImagesWhenIdle = (urls = []) => {
  if (typeof window === "undefined") {
    return;
  }

  const uniqueUrls = [...new Set(urls.filter(Boolean))];
  if (!uniqueUrls.length) {
    return;
  }

  runWhenIdle(() => {
    uniqueUrls.forEach((url) => {
      if (requestedImages.has(url)) {
        return;
      }

      requestedImages.add(url);
      const image = new Image();
      image.decoding = "async";
      image.src = url;
    });
  });
};
