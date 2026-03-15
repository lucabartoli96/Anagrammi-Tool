const arrowPath = [
  "M19 19L12.7071 12.7071C12.3166 12.3166 12.3166 11.6834 12.7071 11.2929L19 5",
  "M11 19L4.70711 12.7071C4.31658 12.3166 4.31658 11.6834 4.70711 11.2929L11 5"
];
const ArrowsIcon = ({ rotate }) => {
  return (
    <svg
      className={rotate ? "rotate" : ""}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path d={arrowPath[0]} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
      <path d={arrowPath[1]} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export default ArrowsIcon;