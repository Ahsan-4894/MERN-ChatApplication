import {
  AudioFile as AudioFileIcon,
  Image as ImageIcon,
  UploadFile as UploadFileIcon,
  VideoFile as VideoFileIcon,
} from "@mui/icons-material";
import { ListItemText, Menu, MenuItem, MenuList } from "@mui/material";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsFileMenu, setUploadLoader } from "../redux/reducers/misc.js";
import toast from "react-hot-toast";
import { useSendAttachmentsMutation } from "../redux/api/api.js";
const FileMenu = ({ anchorE1, chatId }) => {
  const { isFileMenu } = useSelector((state) => state.misc);
  const dispatch = useDispatch();

  const imageRef = useRef(null);
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const fileRef = useRef(null);

  const selectImageRef = () => imageRef.current?.click();
  const selectAudioRef = () => audioRef.current?.click();
  const selectVideoRef = () => videoRef.current?.click();
  const selectFileRef = () => fileRef.current?.click();

  const [sendAttachments] = useSendAttachmentsMutation();

  const closeFileMenuHandler = () => {
    dispatch(setIsFileMenu(false));
  };
  const onFileChangeHandler = async (e, key) => {
    const files = Array.from(e.target.files);

    if (files.length <= 0) return;

    if (files.length > 5) return toast.error(`Only 5 ${key} at a time`);
    dispatch(setUploadLoader(true));

    const toastId = toast.loading(`Sending ${key}`);
    closeFileMenuHandler();

    try {
      //Send uploded files to Server now!
      const myForm = new FormData();
      myForm.append("chatId", chatId);

      files.forEach((file) => {
        myForm.append("files", file);
      });
      const res = await sendAttachments(myForm);
      console.log(res);
      if (res.data)
        toast.success(`Uploaded ${key} successfully`, { id: toastId });
      else
        toast.error(`Cannot send ${key}, Something went wrong!`, {
          id: toastId,
        });
    } catch (error) {
      console.log(error);
      toast.error(error || "Something went wrong", { id: toastId });
    } finally {
      dispatch(setUploadLoader(false));
    }
  };

  const ImageSendComponent = (
    <MenuItem onClick={selectImageRef}>
      <ImageIcon />
      <ListItemText>Image</ListItemText>
      <input
        type="file"
        multiple
        accept="image/png, image/jpeg, image/jpg,image/gif"
        style={{ visibility: "hidden" }}
        onChange={(e) => onFileChangeHandler(e, "Images")}
        ref={imageRef}
      />
    </MenuItem>
  );

  const AudioSendComponent = (
    <MenuItem onClick={selectAudioRef}>
      <AudioFileIcon />
      <ListItemText>Audio</ListItemText>
      <input
        type="file"
        multiple
        accept="audio/mpeg, audio/wav, audio/mp3"
        style={{ visibility: "hidden" }}
        onChange={(e) => onFileChangeHandler(e, "Audios")}
        ref={audioRef}
      />
    </MenuItem>
  );

  const VideoSendComponent = (
    <MenuItem onClick={selectVideoRef}>
      <VideoFileIcon />
      <ListItemText>Video</ListItemText>
      <input
        type="file"
        multiple
        accept="video/mpeg, video/wav, video/mp3"
        style={{ visibility: "hidden" }}
        onChange={(e) => onFileChangeHandler(e, "Videos")}
        ref={videoRef}
      />
    </MenuItem>
  );

  const FileSendComponent = (
    <MenuItem onClick={selectFileRef}>
      <UploadFileIcon />
      <ListItemText>Upload A File</ListItemText>
      <input
        type="file"
        multiple
        accept="*"
        style={{ visibility: "hidden" }}
        onChange={(e) => onFileChangeHandler(e, "Files")}
        ref={fileRef}
      />
    </MenuItem>
  );

  return (
    <Menu anchorEl={anchorE1} open={isFileMenu} onClose={closeFileMenuHandler}>
      <div
        style={{
          width: "10rem",
          marginBottom: "1rem",
        }}
      >
        <MenuList>
          {ImageSendComponent}
          {AudioSendComponent}
          {VideoSendComponent}
          {FileSendComponent}
        </MenuList>
      </div>
    </Menu>
  );
};

export default FileMenu;
