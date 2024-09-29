import iconv from "iconv-lite";
export const convertThreads = async (json: any) => {
  let subject: string = "";
  await json.forEach((element: { type: number; id: string; name: string }) => {
    if (element.type === 0) {
      subject += `${element.id.slice(-10)}.dat<>${element.name} (10)\n`;
    }
  });

  let sjisSubject = iconv.encode(subject, "shift-jis");
  return sjisSubject;
};
