import { ResultAsync } from "neverthrow";
import axiosInstance from "../../index";
import { BondscapePreviewImage } from "@/types/image";

export interface PostImageParams {
  readonly file: BondscapePreviewImage;
}

const PostImage = ({
  file,
}: PostImageParams): ResultAsync<{ url: string }, Error> => {
  const data = new FormData();
  data.append("file", file);
  return ResultAsync.fromPromise(
    axiosInstance.post("/media", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
    (e: any) => e ?? Error("Error saving the file"),
  ).map((response) => response.data);
};

export default PostImage;
