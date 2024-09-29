import iconv from "iconv-lite";

function convertUnixTime(unixTime: number): string {
  // Unixタイムをミリ秒からDateオブジェクトに変換
  const date = new Date(unixTime);

  // 曜日リスト
  const daysOfWeek: string[] = ["日", "月", "火", "水", "木", "金", "土"];

  // 年月日、曜日、時間をフォーマット
  const year: number = date.getFullYear();
  const month: string = ("0" + (date.getMonth() + 1)).slice(-2);
  const day: string = ("0" + date.getDate()).slice(-2);
  const dayOfWeek: string = daysOfWeek[date.getDay()];
  const hours: string = ("0" + date.getHours()).slice(-2);
  const minutes: string = ("0" + date.getMinutes()).slice(-2);
  const seconds: string = ("0" + date.getSeconds()).slice(-2);

  // フォーマットした文字列を返す
  return `${year}/${month}/${day}(${dayOfWeek}) ${hours}:${minutes}:${seconds}`;
}

export const convertDat = async (json: any) => {
  let subject: string = "";
  await json.forEach(
    (element: {
      createdTimestamp: number;
      content: string;
      author: any;
      name: string;
    }) => {
      const date: string = convertUnixTime(element.createdTimestamp);
      subject += `名無しさん<><>${date} ID:${element.author.id.slice(
        -10
      )}<> ${element.content.replace(/\n/g, "<br>")}<>\n`;
    }
  );

  let sjisSubject = iconv.encode(subject, "shift-jis");
  return sjisSubject;
};
export const searchChannel = async (cId: string, channels: any) => {
  const channelId = channels.filter((channel: any) => channel.id.includes(cId));
  console.log(channels);
  return channelId;
};
