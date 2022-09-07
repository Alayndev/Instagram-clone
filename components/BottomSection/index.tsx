import { BsHouseDoor, BsSearch, BsFilePlay, BsHandbag } from "react-icons/bs";
import { InstagramStory } from "components/ui/InstagramStory";

// It is a component because it's going to have functionalities, that's why it's not inside /ui
export function BottomSection() {
  return (
    <>
      <div className="md:hidden border-t-2 p-3 px-10 flex flex-col gap-5 sticky bottom-0 right-0 z-50 bg-white">
        <div className="flex items-center justify-between">
          <BsHouseDoor className="w-7 h-7" />

          <BsSearch className="w-7 h-7" />

          <BsFilePlay className="w-7 h-7" />

          <BsHandbag className="w-7 h-7" />

          <InstagramStory          
            src="https://firebasestorage.googleapis.com/v0/b/instagram-clone-6bd64.appspot.com/o/WhatsApp%20Image%202022-07-04%20at%2012.40.51%20PM.jpeg-1662241822467?alt=media&token=773a7d62-43c6-4587-9197-06a047786b9e"
          />
        </div>
      </div>
    </>
  );
}
