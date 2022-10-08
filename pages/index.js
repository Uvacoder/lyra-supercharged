import ContainerImage from "../components/ui/containers/container-image";
import config from "../lib/config/config.json";

export default function Homepage() {
  return (
    <ContainerImage src="/lyra-supercharged-dalle.tiny.png">
      <div className="mt-5 text-center">
        <h1 className="title">{config.appName}</h1>
      </div>
    </ContainerImage>
  );
}
