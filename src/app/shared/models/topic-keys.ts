export interface Topic {
  guid: string;
  color: string;
  image: string;
  main_key_guid: string;
  key: string;
  lang_code: string;
  lang_name: string;
}

export interface TopicKeys {
  id: number;
  guid: string;
  name: string;
  lang_code: string;
  lang_name: string;
  topics: Topic[];
}
