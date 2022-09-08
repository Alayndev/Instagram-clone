import { ShowImage } from "../ShowImage";
import { InstagramStoryProps } from "lib/types";

export function InstagramStory(props: InstagramStoryProps) {
  return (
    <>
      <div className={`flex flex-col gap-1 items-center justify-center`}>
        <div
          className={`rounded-[2.5rem] bg-gradient-to-r p-[2px]  ${
            props.closeFriends ? "bg-[#6dc993]" : "from-[#8a3ab9] to-[#fbad50]"
          }`}
        >
          <div className="h-full bg-white text-white rounded-[2.5rem] max-h-[42px] p-[1px]">
            <ShowImage
              src={props.src}
              alt="Profile"
              className={`h-[40px] w-[40px] rounded-3xl`}
            />
          </div>
        </div>

        {props.userName && (
          <span className="whitespace-nowrap">{props.userName}</span>
        )}
      </div>
    </>
  );
}
