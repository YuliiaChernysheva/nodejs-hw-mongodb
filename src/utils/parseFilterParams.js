function parseIsFavourite(value) {
  if (typeof value === 'undefined') return undefined;
  if (value === 'true') return true;
  if (value === 'false') return false;
  return undefined;
}

function parseContactType(value) {
  return typeof value === 'string' && value.trim() !== ''
    ? value.trim()
    : undefined;
}

export function parseFilterParams(query) {
  const { type, isFavourite } = query;

  return {
    contactType: parseContactType(type),
    isFavourite: parseIsFavourite(isFavourite),
  };
}
