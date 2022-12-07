import {Taxonomy} from "./taxonomy";
import {Volumes} from "./volumes";
import {Topics} from "./topics";

export interface Posts {
    id: number;
    image_id: number;
    creator_id: number;
    status: number;
    created_at: string;
    updated_at: string;
    deleted_at: any;
    volume_number?: string | number;
    letter?: string;
    page?: string | number;
    slice_of_page?: string;
    chat_id: string;
    color?: string;
    type?: string;
    title: string;
    description: string;
    image: any;
    translations: any[];
    taxonomies: Taxonomy[];
    volumes: Volumes[];
    topics: Topics[];
}
