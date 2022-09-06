/* eslint-disable @next/next/no-img-element */

export function InstagramStory(props: any) {
  return (
    <>
      <div
        className={`${
          props.width + 5
        } flex flex-col gap-1 items-center justify-center`}
      >
        <div
          className={`rounded-[2.5rem] bg-gradient-to-r p-[2px]  ${
            props.closeFriends ? "bg-[#6dc993]" : "from-[#8a3ab9] to-[#fbad50]"
          }`}
        >
          <div className="h-full bg-white text-white rounded-[2.5rem] p-[1px]">
            <img
              className={`${props.width} ${props.height} rounded-3xl`}
              src={props.src}
              alt="Profile"
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
