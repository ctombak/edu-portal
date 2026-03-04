export type NavLink = {
  type: "link";
  title: string;
  href: string;
};

export type NavFolder = {
  type: "folder";
  title: string;
  href?: string;
  children: NavNode[];
};

export type NavNode = NavLink | NavFolder;
