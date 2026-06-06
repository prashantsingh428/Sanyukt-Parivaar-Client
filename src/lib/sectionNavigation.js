export const getSectionPath = (id) => `/${id}`;

export const scrollToSectionById = (id, offset = 80) => {
  const element = document.getElementById(id);
  if (!element) {
    return false;
  }

  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const offsetPosition = elementPosition - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });

  return true;
};

export const navigateToSection = (event, id, offset = 80, method = "pushState") => {
  if (event) {
    event.preventDefault();
  }

  const didScroll = scrollToSectionById(id, offset);
  if (!didScroll) {
    return false;
  }

  window.history[method](null, "", getSectionPath(id));
  return true;
};
