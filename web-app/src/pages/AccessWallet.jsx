import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useState } from "react";
import AccessWithKeys from "../components/AccessWallet/AccessWithKeys";
import AccessWithFile from "../components/AccessWallet/AccessWithFile";

function AccessWallet() {
  const [accessViaFile, setAccessViaFile] = useState(false);

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="w-full sm:w-5/6 md:w-3/4">
        <TabGroup selectedIndex={+accessViaFile}>
          <TabList className="w-full flex justify-between border rounded-xl">
            <Tab
              onClick={() => setAccessViaFile(false)}
              className={`flex flex-1 justify-center  py-4 ${
                !accessViaFile ? `bg-slate-300 rounded-xl text-white` : ``
              }`}
            >
              Public and Private Key
            </Tab>
            <Tab
              onClick={() => setAccessViaFile(true)}
              className={`flex flex-1 justify-center  py-4 ${
                accessViaFile ? `bg-slate-300 rounded-xl text-white` : ``
              }`}
            >
              File Keys
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <AccessWithKeys />
            </TabPanel>
            <TabPanel>
              <AccessWithFile />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
}

export default AccessWallet;
