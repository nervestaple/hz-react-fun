const dumbStringHash = s => {
  let hash = 0;
  const strlen = s.length;
  if (strlen === 0) {
    return hash;
  }
  let c;
  for (let i = 0; i < strlen; i += 1) {
    c = s.charCodeAt(i);
    hash = ((hash << 5) - hash) + c;
    hash &= hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

const getNiceWordsFromUid = (uid, numWords) => {
  const niceWords = _.range(numWords)
    .map(n => uid.substring(
      n * (uid.length / numWords),
      (n + 1) * (uid.length / numWords)
    ))
    .map(s => dumbStringHash(s))
    .map(h => (h % wordlist.length) - 1)
    .map(i => wordlist[i]);
  return niceWords;
};

const getNiceNameFromUid = uid => uid && getNiceWordsFromUid(uid, 2).join(' ');
