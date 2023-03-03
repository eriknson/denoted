import request from "graphql-request";
import get from "lodash.get";
import { useQuery } from "react-query";
import { hash } from "../../utils/hash";
import { TheGraphLogo } from "../TheGraphLogo";

type GraphWidgetProps = {
  url: string;
  query: string;
  path: string;
};

export const GraphWidget = ({ url, query, path }: GraphWidgetProps) => {
  const { isLoading, data, isError } = useQuery(
    ["GRAPH", hash(query), path],
    async () => {
      const result = await request(url, query);
      return get(result, path);
    }
  );

  if (isLoading) {
    return <span>loading...</span>;
  }

  if (isError) {
    return <span>an error has occured...</span>;
  }

  return (
    <span className="flex items-center gap-1 rounded-full bg-indigo-300 px-1 py-0">
      {/* <TheGraphLogo /> */}
      {data}
    </span>
  );
};