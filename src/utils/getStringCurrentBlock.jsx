
const getStringCurrentBlock = (slug) => {
  if (slug === 'fun') return 'Fundamentals';
  else if (slug === 'be') return 'Back End';
  else if (slug === 'proj') return 'Project Phase';
  else if (slug === 'fe') return 'Front End';
  else if (slug === 'grad') return 'Graduated';
}

export default getStringCurrentBlock