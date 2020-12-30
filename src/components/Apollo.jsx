import { useQuery, gql } from "@apollo/client";

const TEST = gql`
  {
    test
  }
`;

const Apollo = () => {
  const { data, error, loading } = useQuery(TEST);
  console.log(data, error, loading);
  return <div></div>;
};

export default Apollo;
