import { useUserQuery } from "@/hooks/queries/user";

const Home = () => {
  useUserQuery();
  return <h1>Hello World</h1>;
};

export default Home;
