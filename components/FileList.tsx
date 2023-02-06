import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Text,
} from "@chakra-ui/react";
import { MouseEventHandler } from "react";

export type DFile = {
  name: string;
  cid: string;
};

const FileList = ({
  files,
  onDownload,
}: {
  files: DFile[];
  onDownload: (cid: string) => () => void;
}) => {
  return (
    <>
      {files.map((f) => (
        <Card key={f.cid} m={4} border="1px solid grey">
          <CardBody>
            <Text>
              {f.name}: {f.cid}
            </Text>
          </CardBody>
          <CardFooter>
            <Button colorScheme="cyan" onClick={onDownload(f.cid)}>
              Download
            </Button>
            <Button colorScheme="gray" ml={2}>
              Share
            </Button>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

export default FileList;
