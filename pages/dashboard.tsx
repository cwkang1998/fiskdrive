import FileList, { DFile } from "@/components/FileList";
import { Button, Flex, FormLabel, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState, ChangeEvent } from "react";
import { useAccount, useSigner } from "wagmi";
import lighthouse from "@lighthouse-web3/sdk";
import { config } from "@/config/config";

const Dashboard = () => {
  const { address, isConnected, connector } = useAccount();
  const { data: signer } = useSigner();
  const router = useRouter();
  const [uploadedFile, setUploadedFile] =
    useState<ChangeEvent<HTMLInputElement>>();

  const [files, setFiles] = useState<DFile[]>([]);

  useEffect(() => {
    const asyncFn = async () => {
      if (address) {
        const files = await lighthouse.getUploads(address);
        if (
          (files.data as any).uploads &&
          (files.data as any).uploads.length > 0
        ) {
          setFiles(
            (files.data as any).uploads.map(
              (val: { fileName: string; cid: string }) => ({
                ...val,
                name: val.fileName,
                cid: val.cid,
              })
            )
          );
        }
      }
    };
    asyncFn();
  }, [address]);

  useEffect(() => {
    if (!isConnected) {
      router.replace("/");
    }
  }, [router, isConnected]);

  const onUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files?.length > 0) {
      setUploadedFile(e);
    }
  };

  const onDownload = (cid: string) => async () => {
    if (window && address && signer && uploadedFile) {
      const messageRequested = (await lighthouse.getAuthMessage(address)).data
        .message;
      const signedMessage = await signer.signMessage(messageRequested);

      const keyObject = await lighthouse.fetchEncryptionKey(
        cid,
        address,
        signedMessage
      );

      const decrypted = await lighthouse.decryptFile(cid, keyObject.data.key);
      const url = window.URL.createObjectURL(new Blob([decrypted]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `FileName.pdf`);

      // Append to html link element page
      document.body.appendChild(link);

      // Start download
      link.click();

      // Clean up and remove the link
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
    }
  };

  const initiateUpload = async () => {
    if (address && signer && uploadedFile) {
      const messageRequested = (await lighthouse.getAuthMessage(address)).data
        .message;
      const signedMessage = await signer.signMessage(messageRequested);
      const uploaded = await lighthouse.uploadEncrypted(
        uploadedFile as any,
        address,
        config.LIGHTHOUSE_API_KEY,
        signedMessage
      );

      // re fetch files
      const files = await lighthouse.getUploads(address);
      if (
        (files.data as any).uploads &&
        (files.data as any).uploads.length > 0
      ) {
        setFiles(
          (files.data as any).uploads.map(
            (val: { fileName: string; cid: string }) => ({
              ...val,
              name: val.fileName,
              cid: val.cid,
            })
          )
        );
      }
    }
  };

  return (
    <Flex direction="column" width="100%">
      <Flex
        justifyItems="center"
        direction="row"
        alignItems="space-evenly"
        width="100%"
      >
        <Input onChange={onUpload} type="file" />
        <Input onClick={initiateUpload} type="button" value="Upload" />
      </Flex>
      <FileList files={files} onDownload={onDownload} />
    </Flex>
  );
};

export default Dashboard;
