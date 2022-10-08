import { impact } from "@mateonunez/lyra-impact";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CrossIcon, MagnifyingGlassIcon } from "../components/icons";
import ContainerImage from "../components/ui/containers/container-image";
import EndpointInput from "../components/ui/inputs/endpoint-input";
import Input from "../components/ui/inputs/input";
import config from "../lib/config/config.json";

export default function Homepage() {
  const [lyra, setLyra] = useState(null);

  const endpointCallback = useCallback((endpoint, config) => {
    impact("/api/forward", {
      fetch: {
        method: "POST",
        property: "profile.repositories",
        body: JSON.stringify({
          endpoint,
        }),
      },
    })
      .then((lyra) => {
        console.log(lyra);
      })
      .catch((error) => console.error(error));
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
          <EndpointInput callback={endpointCallback} />
        </div>
      </ContainerImage>
    </>
  );
}
