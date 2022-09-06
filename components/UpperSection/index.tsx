import { useState } from "react";
import {
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlinePlus,
} from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { InstagramStory } from "components/ui/InstagramStory";
import stories from "stories.json";
import { CreatePostForm } from "components/CreatePostForm";

export function UpperSection({ setPosts }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className="border-b-2 p-3 flex flex-col gap-5 sticky top-0 z-50 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center">
            <span className="text-3xl font-bold">Instagram</span>

            <IoIosArrowDown className="mt-4 h-5 w-5" />
          </div>

          <div className="flex gap-3 md:gap-8 items-center justify-center">
            <AiOutlinePlus
              onClick={openModal}
              className="w-6 h-6 border-2 border-black rounded-lg cursor-pointer"
            />

            <AiOutlineHeart className="w-7 h-7" />

            <AiOutlineMessage className="w-6 h-6" />
          </div>
        </div>

        <div className="px-5 flex gap-5 md:gap-10 overflow-hidden overscroll-auto overflow-x-scroll no-scrollbar">
          {stories.map((story) => {
            return (
              <InstagramStory
                width="w-[40px]"
                height="h-[40px]"
                key={story.id}
                userName={story.userName}
                src={story.src}
                closeFriends={story.closeFriends}
              />
            );
          })}
        </div>
      </div>

      {isOpen && <CreatePostForm setPosts={setPosts} setIsOpen={setIsOpen} />}
    </>
  );
}
