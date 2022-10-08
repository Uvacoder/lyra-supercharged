import { impact } from "@mateonunez/lyra-impact";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CrossIcon, MagnifyingGlassIcon } from "../components/icons";
import ContainerImage from "../components/ui/containers/container-image";
import EndpointInput from "../components/ui/inputs/endpoint-input";
import Input from "../components/ui/inputs/input";
import Loading from "../components/ui/loading";
import config from "../lib/config/config.json";

export default function Homepage() {
  const [fetchingEndpoint, setFetchingEndpoint] = useState(false);
  const [lyra, setLyra] = useState(null);

  const endpointCallback = useCallback((endpoint, config) => {
    setFetchingEndpoint(true);

    impact("/api/forward", {
      fetch: {
        method: "POST",
        body: JSON.stringify({
          endpoint,
        }),
      },
    })
      .then((lyra) => setLyra(lyra))
      .catch((error) => {
        // handle error here, should I provide `property` input?
        console.error(error);
      })
      .finally(() => setFetchingEndpoint(false));
  }, []);

  return (
    <>
      <div className="relative z-50">
        <div className="flex mt-5 text-center">
          <h1 className="title">{config.appName}</h1>
        </div>

        <div className="my-20 text-center">
          <h2 className="text-2xl">Quotes or something chill....</h2>
        </div>
      </div>

      <ContainerImage classNameContent="flex justify-between" src="/lyra-supercharged-dalle.tiny.png">
        <div className="w-full px-10 my-auto md:m-auto md:w-2/3">
          {fetchingEndpoint && <Loading />}
          {lyra ? <span>Fetched</span> : <EndpointInput callback={endpointCallback} />}
        </div>
      </ContainerImage>
    </>
  );
}
