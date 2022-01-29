import SyncLoader from "react-spinners/ClipLoader";

const override = `
  display: block;
  margin: 0 auto;
  margin-top: 25px;
`;

export default function Spinner() {
  return <SyncLoader color="#17AEB6" css={override} size={50} />;
}
