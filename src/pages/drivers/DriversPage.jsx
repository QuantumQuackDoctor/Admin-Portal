import Header from "../../shared/header/Header";
import CreateDriverWidget from "./create-driver-widget/CreateDriverWidget";
import { useStickyState } from "../../util/stickyHook";
import EditDriverWidget from "./edit-driver-widget/EditDriverWidget";
import { useParams } from "react-router-dom";
import { useSingletonCall } from "../../util/SingletonHook";
import { WidgetContainer } from "../../shared/widget/Widget";

const DriversPage = () => {
  const [openDrivers, setOpenDrivers] = useStickyState([], "openDrivers");
  const openNewDriver = (id) => {
    if (openDrivers.find((val) => val === id)) return;
    setOpenDrivers([...openDrivers, id]);
  };

  const closeDriver = (id) => {
    setOpenDrivers(openDrivers.filter((val) => val !== id));
  };

  const { id } = useParams();

  useSingletonCall(() => {
    if (id && !openDrivers.find((val) => val === id)) {
      setOpenDrivers([...openDrivers, id]);
    }
  });

  return (
    <Header>
      <WidgetContainer>
        {openDrivers.map((id) => (
          <EditDriverWidget
            key={`EditDriver-${id}`}
            id={id}
            close={() => {
              closeDriver(id);
            }}
          />
        ))}
        <CreateDriverWidget openDriver={openNewDriver} />
      </WidgetContainer>
    </Header>
  );
};

export default DriversPage;
