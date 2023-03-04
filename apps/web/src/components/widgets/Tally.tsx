import request from "graphql-request";
import get from "lodash.get";
import { useQuery } from "react-query";
import { hash } from "../../utils/hash";

type TallyWidgetProps = {
  url: string;
  query: string;
  path: string;
  variable?: string;
};

const requestHeaders = {
  authorization: process.env.NEXT_PUBLIC_TALLY_KEY,
};
export const TallyWidget = ({ url, query, path }: TallyWidgetProps) => {
  const { isLoading, data, isError } = useQuery(
    ["TALLY", hash(query), path],
    async () => {
      const result = await request(url, query);
      console.log(result);
      return get(result, path) as string;
    }
  );
  if (isLoading) {
    return <span>loading...</span>;
  }

  if (isError) {
    return <span>an error has occured...</span>;
  }

  return <span className="rounded-full bg-indigo-300 px-1 py-0">{data}</span>;
};
