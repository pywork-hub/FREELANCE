import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type Activity = {
  __typename?: 'Activity';
  lastSeen: Scalars['DateTime']['output'];
  status: ActivityStatus;
};

export enum ActivityStatus {
  Offline = 'OFFLINE',
  Online = 'ONLINE'
}

export type AddExampleInput = {
  name: Scalars['String']['input'];
  serviceId: Scalars['Int']['input'];
  url?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['Int']['input'];
};

export type AllAttributes = {
  __typename?: 'AllAttributes';
  attributes: Array<Attribute>;
  count: Scalars['Int']['output'];
};

export type AllCategories = {
  __typename?: 'AllCategories';
  categories: Array<CatalogCategory>;
  count: Scalars['Int']['output'];
};

export type AllExamples = {
  __typename?: 'AllExamples';
  count: Scalars['Int']['output'];
  examples: Array<Example>;
};

export type AllRequests = {
  __typename?: 'AllRequests';
  count: Scalars['Int']['output'];
  requests: Array<Request>;
};

export type AllReviews = {
  __typename?: 'AllReviews';
  count: Scalars['Int']['output'];
  reviews: Array<Review>;
};

export type AllServices = {
  __typename?: 'AllServices';
  count: Scalars['Int']['output'];
  services: Array<CatalogService>;
};

export type AllUsers = {
  __typename?: 'AllUsers';
  count: Scalars['Int']['output'];
  users: Array<User>;
};

export type Analytics = {
  __typename?: 'Analytics';
  canceledOrdersCount: Scalars['Int']['output'];
  completedOrdersCount: Scalars['Int']['output'];
  expiredOrdersCount: Scalars['Int']['output'];
  inProcessOrdersCount: Scalars['Int']['output'];
  offlineUsersCount: Scalars['Int']['output'];
  onlineUsersCount: Scalars['Int']['output'];
  popularServices: Array<AnalyticsService>;
  refundedOrdersCount: Scalars['Int']['output'];
  topPurchasers: Array<AnalyticsPurchaser>;
  totalEarned: Scalars['Int']['output'];
};

export type AnalyticsPurchaser = {
  __typename?: 'AnalyticsPurchaser';
  avatarPath: Scalars['String']['output'];
  login: Scalars['String']['output'];
  ordersAmount: Scalars['Int']['output'];
  ordersCount: Scalars['Int']['output'];
};

export type AnalyticsQueryInput = {
  duration: Scalars['String']['input'];
};

export type AnalyticsService = {
  __typename?: 'AnalyticsService';
  categories: Array<Scalars['String']['output']>;
  coverPath: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  orderTimes: Scalars['Int']['output'];
};

export type Attribute = {
  __typename?: 'Attribute';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  properties: Array<Property>;
  slug: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type AttributeInFilters = {
  __typename?: 'AttributeInFilters';
  name: Scalars['String']['output'];
  properties: Array<PropertyInFilter>;
  slug: Scalars['String']['output'];
};

export type AttributeInput = {
  name: Scalars['String']['input'];
  properties: Array<CreatableSelectInput>;
};

export type Block = {
  __typename?: 'Block';
  heading?: Maybe<Scalars['String']['output']>;
  items: Array<BlockItem>;
};

export type BlockInput = {
  heading?: InputMaybe<Scalars['String']['input']>;
  items: Array<BlockItemInput>;
};

export type BlockItem = {
  __typename?: 'BlockItem';
  content: Scalars['String']['output'];
  heading?: Maybe<Scalars['String']['output']>;
};

export type BlockItemInput = {
  content: Scalars['String']['input'];
  heading?: InputMaybe<Scalars['String']['input']>;
};

export type Catalog = {
  __typename?: 'Catalog';
  block?: Maybe<Block>;
  categories: Array<CatalogCategory>;
  categoryName?: Maybe<Scalars['String']['output']>;
  filters?: Maybe<Filters>;
  seo?: Maybe<Seo>;
};

export type CatalogCategory = {
  __typename?: 'CatalogCategory';
  coverPath: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  visibility: Visibility;
};

export type CatalogInput = {
  categoryInput: CategoryQueryInput;
  categorySlug?: InputMaybe<Scalars['String']['input']>;
  serviceInput: ServiceQueryInput;
};

export type CatalogService = {
  __typename?: 'CatalogService';
  averageRating: Scalars['Float']['output'];
  categories: Array<SessionCategory>;
  coverPath: Scalars['String']['output'];
  excerpt: Scalars['String']['output'];
  fromPrice: Scalars['Int']['output'];
  fromSalePrice?: Maybe<Scalars['Int']['output']>;
  fromTerm: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  properties: Array<FilterProperty>;
  reviews: Array<Review>;
  slug: Scalars['String']['output'];
  videoPath: Scalars['String']['output'];
  visibility: Visibility;
};

export type Category = {
  __typename?: 'Category';
  block?: Maybe<Block>;
  childrens: Array<Category>;
  coverPath: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  orderTimes: Scalars['Int']['output'];
  parents: Array<Category>;
  seo?: Maybe<Seo>;
  services: Array<Service>;
  slug: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  visibility: Visibility;
};

export type CategoryInput = {
  block?: InputMaybe<BlockInput>;
  coverPath: Scalars['String']['input'];
  name: Scalars['String']['input'];
  parents: Array<SelectInput>;
  seo?: InputMaybe<SeoInput>;
};

export type CategoryQueryInput = {
  isParents?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  parentSlug?: InputMaybe<Scalars['String']['input']>;
  perPage?: InputMaybe<Scalars['String']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  sort: Sort;
  visibility: Visibility;
};

export type ChangeRoomManagerInput = {
  managerId: Scalars['Int']['input'];
  roomId: Scalars['Int']['input'];
};

export type CreatableSelectInput = {
  name: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type CreateFolderInput = {
  folderPath: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CurrentRoom = {
  __typename?: 'CurrentRoom';
  id: Scalars['Int']['output'];
  messages: Array<RoomMessage>;
  partner: CurrentRoomPartner;
};

export type CurrentRoomPartner = {
  __typename?: 'CurrentRoomPartner';
  activity: Activity;
  id: Scalars['Int']['output'];
  profile: Profile;
};

export type CurrentService = {
  __typename?: 'CurrentService';
  reviewsCount: Scalars['Int']['output'];
  service?: Maybe<Service>;
  similarServices: Array<CatalogService>;
};

export type Example = {
  __typename?: 'Example';
  coverPath: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  imagePath: Scalars['String']['output'];
  name: Scalars['String']['output'];
  review?: Maybe<Review>;
  service?: Maybe<Service>;
  slug: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  url?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
  visibility: Visibility;
};

export type ExampleInput = {
  coverPath: Scalars['String']['input'];
  imagePath: Scalars['String']['input'];
  name: Scalars['String']['input'];
  service?: InputMaybe<SelectInput>;
  url?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<SelectInput>;
};

export type FavoriteService = {
  __typename?: 'FavoriteService';
  slug: Scalars['String']['output'];
};

export type File = {
  __typename?: 'File';
  createdAt: Scalars['DateTime']['output'];
  extension: Scalars['String']['output'];
  name: Scalars['String']['output'];
  path: Scalars['String']['output'];
  size: Scalars['String']['output'];
};

export type FilterAttribute = {
  __typename?: 'FilterAttribute';
  name: Scalars['String']['output'];
};

export type FilterProperty = {
  __typename?: 'FilterProperty';
  attribute: FilterAttribute;
  attributeId: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

export type Filters = {
  __typename?: 'Filters';
  attributes: Array<AttributeInFilters>;
  maxPrice: Scalars['Int']['output'];
  maxTerm: Scalars['Int']['output'];
  minPrice: Scalars['Int']['output'];
  minTerm: Scalars['Int']['output'];
};

export type Folder = {
  __typename?: 'Folder';
  count: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  path: Scalars['String']['output'];
  size: Scalars['String']['output'];
};

export type FolderWithChild = {
  __typename?: 'FolderWithChild';
  childrens: Array<FolderWithChild>;
  createdAt: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  path: Scalars['String']['output'];
};

export type JwtAuthConfirmationInput = {
  email: Scalars['String']['input'];
  login: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type JwtAuthLoginInput = {
  loginOrEmail: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type JwtAuthResetInput = {
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type JwtAuthVerificationInput = {
  email: Scalars['String']['input'];
};

export type LastMessage = {
  __typename?: 'LastMessage';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isChecked: Scalars['Boolean']['output'];
  senderId: Scalars['Int']['output'];
  status: MessageStatus;
  type: MessageType;
  updatedAt: Scalars['DateTime']['output'];
};

export type Message = {
  __typename?: 'Message';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isChecked: Scalars['Boolean']['output'];
  orderId?: Maybe<Scalars['Int']['output']>;
  room: Room;
  roomId: Scalars['Int']['output'];
  sender: User;
  senderId: Scalars['Int']['output'];
  status: MessageStatus;
  type: MessageType;
  updatedAt: Scalars['DateTime']['output'];
};

export type MessageActionInput = {
  action: MessageStatus;
  content?: InputMaybe<Scalars['String']['input']>;
  messageId?: InputMaybe<Scalars['Int']['input']>;
  roomId: Scalars['Int']['input'];
};

export enum MessageStatus {
  Deleted = 'DELETED',
  Edited = 'EDITED',
  Posted = 'POSTED'
}

export enum MessageType {
  Message = 'MESSAGE',
  Offer = 'OFFER',
  OrderCanceled = 'ORDER_CANCELED',
  OrderCompleted = 'ORDER_COMPLETED',
  OrderExpired = 'ORDER_EXPIRED',
  OrderInProcess = 'ORDER_IN_PROCESS',
  OrderRefunded = 'ORDER_REFUNDED',
  ReviewLeft = 'REVIEW_LEFT',
  ReviewOffered = 'REVIEW_OFFERED',
  Service = 'SERVICE'
}

export type Mutation = {
  __typename?: 'Mutation';
  addExample: Example;
  changeRoomManager: Scalars['Boolean']['output'];
  checkMessages: Array<Scalars['Int']['output']>;
  createAttribute: Attribute;
  createCategory: Category;
  createExample: Example;
  createFolder: Scalars['String']['output'];
  createOffer: Message;
  createReviewOffer: Message;
  createService: Service;
  deleteAttribute: Attribute;
  deleteCategory: Category;
  deleteExample: Example;
  deleteFileOrFolder: Scalars['String']['output'];
  deleteRequest: Request;
  deleteRoom: Scalars['Boolean']['output'];
  deleteService: Service;
  deleteUser: User;
  duplicateAttribute: Attribute;
  duplicateCategory: Category;
  duplicateExample: Example;
  duplicateService: Service;
  jwtConfirmation: Scalars['Boolean']['output'];
  jwtLogin: SessionUserResponse;
  jwtReset: Scalars['Boolean']['output'];
  jwtVerification: Scalars['Boolean']['output'];
  leftReview: Message;
  logout: Scalars['Boolean']['output'];
  messageAction: Message;
  messages: Array<RoomMessage>;
  orderAction: Message;
  orderService: Message;
  sendNewsletter: Scalars['Boolean']['output'];
  sendRequest: Request;
  toggleCategory: Category;
  toggleExample: Example;
  toggleFavorite: SessionUserResponse;
  toggleService: Service;
  toggleTyping: Scalars['Boolean']['output'];
  updateAttribute: Attribute;
  updateCategory: Category;
  updateExample: Example;
  updatePage: Scalars['Boolean']['output'];
  updateProfile: SessionUserResponse;
  updateService: Service;
  updateUser: User;
  uploadFiles: Scalars['String']['output'];
};


export type MutationAddExampleArgs = {
  data: AddExampleInput;
};


export type MutationChangeRoomManagerArgs = {
  data: ChangeRoomManagerInput;
};


export type MutationCheckMessagesArgs = {
  messagesIds: Array<Scalars['Int']['input']>;
  roomId: Scalars['Int']['input'];
};


export type MutationCreateFolderArgs = {
  data: CreateFolderInput;
};


export type MutationCreateOfferArgs = {
  data: OfferInput;
};


export type MutationCreateReviewOfferArgs = {
  data: ReviewOfferInput;
};


export type MutationDeleteAttributeArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteExampleArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteFileOrFolderArgs = {
  path: Scalars['String']['input'];
};


export type MutationDeleteRequestArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteRoomArgs = {
  roomId: Scalars['Int']['input'];
};


export type MutationDeleteServiceArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDuplicateAttributeArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDuplicateCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDuplicateExampleArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDuplicateServiceArgs = {
  id: Scalars['Int']['input'];
};


export type MutationJwtConfirmationArgs = {
  data: JwtAuthConfirmationInput;
};


export type MutationJwtLoginArgs = {
  data: JwtAuthLoginInput;
};


export type MutationJwtResetArgs = {
  data: JwtAuthResetInput;
};


export type MutationJwtVerificationArgs = {
  data: JwtAuthVerificationInput;
};


export type MutationLeftReviewArgs = {
  data: ReviewInput;
};


export type MutationMessageActionArgs = {
  data: MessageActionInput;
};


export type MutationMessagesArgs = {
  query: QueryInput;
  roomId: Scalars['Int']['input'];
};


export type MutationOrderActionArgs = {
  data: OrderActionInput;
};


export type MutationOrderServiceArgs = {
  data: ServiceOrderInput;
};


export type MutationSendNewsletterArgs = {
  data: NewsletterInput;
};


export type MutationSendRequestArgs = {
  data: RequestInput;
};


export type MutationToggleCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationToggleExampleArgs = {
  id: Scalars['Int']['input'];
};


export type MutationToggleFavoriteArgs = {
  serviceSlug: Scalars['String']['input'];
};


export type MutationToggleServiceArgs = {
  id: Scalars['Int']['input'];
};


export type MutationToggleTypingArgs = {
  data: TypingInput;
};


export type MutationUpdateAttributeArgs = {
  data: AttributeInput;
  id: Scalars['Int']['input'];
};


export type MutationUpdateCategoryArgs = {
  data: CategoryInput;
  id: Scalars['Int']['input'];
};


export type MutationUpdateExampleArgs = {
  data: ExampleInput;
  id: Scalars['Int']['input'];
};


export type MutationUpdatePageArgs = {
  data: PageInput;
  type: PageType;
};


export type MutationUpdateProfileArgs = {
  data: ProfileInput;
};


export type MutationUpdateServiceArgs = {
  data: ServiceInput;
  id: Scalars['Int']['input'];
};


export type MutationUpdateUserArgs = {
  data: UserInput;
  id: Scalars['Int']['input'];
};


export type MutationUploadFilesArgs = {
  data: UploadFilesInput;
};

export type NewsletterInput = {
  emails?: InputMaybe<Array<CreatableSelectInput>>;
  file: Scalars['Upload']['input'];
  subject: Scalars['String']['input'];
};

export type OfferInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  price: Scalars['Int']['input'];
  roomId: Scalars['Int']['input'];
  term: Scalars['Int']['input'];
};

export type OpenGraphs = {
  __typename?: 'OpenGraphs';
  description: Scalars['String']['output'];
  images: Array<OpenGraphsImage>;
  title: Scalars['String']['output'];
};

export type OpenGraphsImage = {
  __typename?: 'OpenGraphsImage';
  alt: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type OpenGraphsImageInput = {
  alt: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type OpenGraphsInput = {
  description: Scalars['String']['input'];
  images: Array<OpenGraphsImageInput>;
  title: Scalars['String']['input'];
};

export type Order = {
  __typename?: 'Order';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  partner: Profile;
  status: OrderStatus;
  term: Scalars['Int']['output'];
  termUpdatedAt: Scalars['DateTime']['output'];
  total: Scalars['Int']['output'];
};

export type OrderActionInput = {
  managerId: Scalars['Int']['input'];
  orderId: Scalars['Int']['input'];
  term?: InputMaybe<Scalars['Int']['input']>;
  type: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
};

export enum OrderStatus {
  Canceled = 'CANCELED',
  Completed = 'COMPLETED',
  Expired = 'EXPIRED',
  InProcess = 'IN_PROCESS',
  Pending = 'PENDING',
  Refunded = 'REFUNDED'
}

export type Page = {
  __typename?: 'Page';
  block?: Maybe<Block>;
  seo?: Maybe<Seo>;
};

export type PageInput = {
  block?: InputMaybe<BlockInput>;
  seo?: InputMaybe<SeoInput>;
};

export enum PageType {
  Home = 'HOME',
  Market = 'MARKET'
}

export type Profile = {
  __typename?: 'Profile';
  avatarPath: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  login: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['Int']['output'];
};

export type ProfileInput = {
  avatarFile?: InputMaybe<Scalars['Upload']['input']>;
  login: Scalars['String']['input'];
};

export type Property = {
  __typename?: 'Property';
  attribute: Attribute;
  attributeId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  services: Array<Service>;
  slug: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type PropertyInFilter = {
  __typename?: 'PropertyInFilter';
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  analytics: Analytics;
  attributeById: Attribute;
  attributes: AllAttributes;
  catalog: Catalog;
  categories: AllCategories;
  categoryById: Category;
  currentRoom?: Maybe<CurrentRoom>;
  currentService: CurrentService;
  exampleById: Example;
  examples: AllExamples;
  folderItems: StorageItem;
  folders: Array<FolderWithChild>;
  jwtRegister: SessionUserResponse;
  notificationMessages: Array<Message>;
  orders: Array<Order>;
  otherManagers: Array<User>;
  page: Page;
  pageBlock?: Maybe<Block>;
  pageSeo?: Maybe<Seo>;
  properties: Array<Property>;
  requestById: Request;
  requests: AllRequests;
  reviews: AllReviews;
  serviceById: Service;
  services: AllServices;
  userById: User;
  userFavorites: AllServices;
  userRooms: Array<UserRoom>;
  users: AllUsers;
};


export type QueryAnalyticsArgs = {
  query: AnalyticsQueryInput;
};


export type QueryAttributeByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryAttributesArgs = {
  query: QueryInput;
};


export type QueryCatalogArgs = {
  data: CatalogInput;
};


export type QueryCategoriesArgs = {
  query: CategoryQueryInput;
};


export type QueryCategoryByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryCurrentRoomArgs = {
  partnerLogin: Scalars['String']['input'];
  query: QueryInput;
};


export type QueryCurrentServiceArgs = {
  slug: Scalars['String']['input'];
};


export type QueryExampleByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryExamplesArgs = {
  query: QueryFullestInput;
};


export type QueryFolderItemsArgs = {
  folderPath: Scalars['String']['input'];
};


export type QueryJwtRegisterArgs = {
  token: Scalars['String']['input'];
};


export type QueryOrdersArgs = {
  query: QueryInput;
};


export type QueryPageArgs = {
  type: PageType;
};


export type QueryPageBlockArgs = {
  type: PageType;
};


export type QueryPageSeoArgs = {
  type: PageType;
};


export type QueryRequestByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRequestsArgs = {
  query: QueryInput;
};


export type QueryReviewsArgs = {
  query: QueryInput;
  slug: Scalars['String']['input'];
};


export type QueryServiceByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryServicesArgs = {
  categorySlug?: InputMaybe<Scalars['String']['input']>;
  query: ServiceQueryInput;
};


export type QueryUserByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryUserFavoritesArgs = {
  query: ServiceQueryInput;
};


export type QueryUserRoomsArgs = {
  query: QueryInput;
};


export type QueryUsersArgs = {
  query: QueryInput;
};

export type QueryFullestInput = {
  page?: InputMaybe<Scalars['String']['input']>;
  perPage?: InputMaybe<Scalars['String']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  sort: Sort;
  visibility: Visibility;
};

export type QueryInput = {
  page?: InputMaybe<Scalars['String']['input']>;
  perPage?: InputMaybe<Scalars['String']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  sort: Sort;
};

export type Request = {
  __typename?: 'Request';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastName: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type RequestInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  message: Scalars['String']['input'];
};

export type Review = {
  __typename?: 'Review';
  comment: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  rating: Scalars['Int']['output'];
  user: SessionUser;
};

export type ReviewInput = {
  comment: Scalars['String']['input'];
  rating: Scalars['Int']['input'];
  roomId: Scalars['Int']['input'];
  serviceId: Scalars['Int']['input'];
};

export type ReviewOfferInput = {
  roomId: Scalars['Int']['input'];
  serviceId: Scalars['Int']['input'];
};

export type Room = {
  __typename?: 'Room';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  messages: Array<Message>;
  updatedAt: Scalars['DateTime']['output'];
  users: Array<User>;
};

export type RoomMessage = {
  __typename?: 'RoomMessage';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isChecked: Scalars['Boolean']['output'];
  sender: User;
  status: MessageStatus;
  type: MessageType;
  updatedAt: Scalars['DateTime']['output'];
};

export type SelectInput = {
  name: Scalars['String']['input'];
  value: Scalars['Int']['input'];
};

export type SelectUserRoleInput = {
  name: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type Seo = {
  __typename?: 'Seo';
  description: Scalars['String']['output'];
  graphs?: Maybe<OpenGraphs>;
  keywords: Array<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type SeoInput = {
  description: Scalars['String']['input'];
  graphs?: InputMaybe<OpenGraphsInput>;
  keywords: Array<CreatableSelectInput>;
  title: Scalars['String']['input'];
};

export type Service = {
  __typename?: 'Service';
  averageRating: Scalars['Float']['output'];
  cartUsers: Array<User>;
  categories: Array<Category>;
  coverPath: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  examples: Array<Example>;
  excerpt: Scalars['String']['output'];
  favoriteUsers: Array<User>;
  fromPrice: Scalars['Int']['output'];
  fromSalePrice?: Maybe<Scalars['Int']['output']>;
  fromTerm: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  orderTimes: Scalars['Int']['output'];
  properties: Array<Property>;
  reviews: Array<Review>;
  seo?: Maybe<Seo>;
  slug: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  videoPath: Scalars['String']['output'];
  visibility: Visibility;
};

export type ServiceInput = {
  categories: Array<SelectInput>;
  coverPath: Scalars['String']['input'];
  description: Scalars['String']['input'];
  examples: Array<SelectInput>;
  excerpt: Scalars['String']['input'];
  fromPrice: Scalars['Int']['input'];
  fromSalePrice?: InputMaybe<Scalars['Int']['input']>;
  fromTerm: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  properties: Array<SelectInput>;
  seo?: InputMaybe<SeoInput>;
  videoPath: Scalars['String']['input'];
};

export type ServiceOrderInput = {
  quantity: Scalars['Int']['input'];
  serviceSlug: Scalars['String']['input'];
};

export type ServiceQueryInput = {
  maxPrice?: InputMaybe<Scalars['String']['input']>;
  maxTerm?: InputMaybe<Scalars['String']['input']>;
  minPrice?: InputMaybe<Scalars['String']['input']>;
  minTerm?: InputMaybe<Scalars['String']['input']>;
  orderTimes?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  perPage?: InputMaybe<Scalars['String']['input']>;
  properties?: InputMaybe<Array<Scalars['String']['input']>>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  sort: Sort;
  visibility: Visibility;
};

export type SessionCategory = {
  __typename?: 'SessionCategory';
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

export type SessionProfile = {
  __typename?: 'SessionProfile';
  avatarPath: Scalars['String']['output'];
  email: Scalars['String']['output'];
  login: Scalars['String']['output'];
};

export type SessionUser = {
  __typename?: 'SessionUser';
  favorites: Array<FavoriteService>;
  id: Scalars['Int']['output'];
  profile: SessionProfile;
  roles: Array<UserRole>;
};

export type SessionUserResponse = {
  __typename?: 'SessionUserResponse';
  user: SessionUser;
};

export enum Sort {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StorageItem = {
  __typename?: 'StorageItem';
  files: Array<File>;
  folders: Array<Folder>;
};

export type Subscription = {
  __typename?: 'Subscription';
  checkedMessage?: Maybe<Array<Scalars['Int']['output']>>;
  roomMessages?: Maybe<Message>;
  userActivity?: Maybe<Activity>;
  userNotification?: Maybe<Message>;
  userTyping?: Maybe<Typing>;
};


export type SubscriptionCheckedMessageArgs = {
  roomId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};


export type SubscriptionRoomMessagesArgs = {
  roomId: Scalars['Int']['input'];
};


export type SubscriptionUserActivityArgs = {
  userId: Scalars['Int']['input'];
};


export type SubscriptionUserNotificationArgs = {
  userId: Scalars['Int']['input'];
};


export type SubscriptionUserTypingArgs = {
  roomId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};

export type TelegramBot = {
  __typename?: 'TelegramBot';
  chatId: Scalars['String']['output'];
  token: Scalars['String']['output'];
};

export type TelegramBotInput = {
  chatId: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type Typing = {
  __typename?: 'Typing';
  isPartnerTyping: Scalars['Boolean']['output'];
};

export type TypingInput = {
  isTyping: Scalars['Boolean']['input'];
  roomId: Scalars['Int']['input'];
};

export type UploadFilesInput = {
  data: Array<Scalars['Upload']['input']>;
  folderPath: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  bots: Array<TelegramBot>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  profile: Profile;
  reviews?: Maybe<Array<Review>>;
  roles: Array<UserRole>;
  updatedAt: Scalars['DateTime']['output'];
};

export type UserInput = {
  bots: Array<TelegramBotInput>;
  roles: Array<SelectUserRoleInput>;
};

export enum UserRole {
  Admin = 'ADMIN',
  Manager = 'MANAGER',
  User = 'USER'
}

export type UserRoom = {
  __typename?: 'UserRoom';
  id: Scalars['Int']['output'];
  lastMessage?: Maybe<LastMessage>;
  partner: CurrentRoomPartner;
};

export enum Visibility {
  Hidden = 'HIDDEN',
  Visible = 'VISIBLE'
}

export type CreateAttributeMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateAttributeMutation = { createAttribute: { id: number } };

export type DeleteAttributeMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteAttributeMutation = { deleteAttribute: { id: number } };

export type DuplicateAttributeMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DuplicateAttributeMutation = { duplicateAttribute: { id: number } };

export type UpdateAttributeMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  data: AttributeInput;
}>;


export type UpdateAttributeMutation = { updateAttribute: { id: number } };

export type CreateCategoryMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateCategoryMutation = { createCategory: { id: number } };

export type DeleteCategoryMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteCategoryMutation = { deleteCategory: { id: number } };

export type DuplicateCategoryMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DuplicateCategoryMutation = { duplicateCategory: { id: number } };

export type ToggleCategoryMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type ToggleCategoryMutation = { toggleCategory: { id: number } };

export type UpdateCategoryMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  data: CategoryInput;
}>;


export type UpdateCategoryMutation = { updateCategory: { id: number } };

export type AddExampleMutationVariables = Exact<{
  data: AddExampleInput;
}>;


export type AddExampleMutation = { addExample: { id: number } };

export type CreateExampleMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateExampleMutation = { createExample: { id: number } };

export type DeleteExampleMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteExampleMutation = { deleteExample: { id: number } };

export type DuplicateExampleMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DuplicateExampleMutation = { duplicateExample: { id: number } };

export type ToggleExampleMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type ToggleExampleMutation = { toggleExample: { id: number } };

export type UpdateExampleMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  data: ExampleInput;
}>;


export type UpdateExampleMutation = { updateExample: { id: number } };

export type CheckMessagesMutationVariables = Exact<{
  roomId: Scalars['Int']['input'];
  messagesIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type CheckMessagesMutation = { checkMessages: Array<number> };

export type CreateOfferMutationVariables = Exact<{
  data: OfferInput;
}>;


export type CreateOfferMutation = { createOffer: { content: string, type: MessageType, status: MessageStatus, sender: { profile: { login: string, avatarPath: string } } } };

export type CreateReviewOfferMutationVariables = Exact<{
  data: ReviewOfferInput;
}>;


export type CreateReviewOfferMutation = { createReviewOffer: { content: string, type: MessageType, status: MessageStatus, sender: { profile: { login: string, avatarPath: string } } } };

export type LeftReviewMutationVariables = Exact<{
  data: ReviewInput;
}>;


export type LeftReviewMutation = { leftReview: { content: string, type: MessageType, status: MessageStatus, sender: { profile: { login: string, avatarPath: string } } } };

export type MessageActionMutationVariables = Exact<{
  data: MessageActionInput;
}>;


export type MessageActionMutation = { messageAction: { content: string, type: MessageType, status: MessageStatus, sender: { profile: { login: string, avatarPath: string } } } };

export type MessagesMutationVariables = Exact<{
  roomId: Scalars['Int']['input'];
  query: QueryInput;
}>;


export type MessagesMutation = { messages: Array<{ id: number, content: string, isChecked: boolean, type: MessageType, status: MessageStatus, updatedAt: any, createdAt: any, sender: { profile: { login: string, avatarPath: string } } }> };

export type ToggleTypingMutationVariables = Exact<{
  data: TypingInput;
}>;


export type ToggleTypingMutation = { toggleTyping: boolean };

export type SendNewsletterMutationVariables = Exact<{
  data: NewsletterInput;
}>;


export type SendNewsletterMutation = { sendNewsletter: boolean };

export type OrderActionMutationVariables = Exact<{
  data: OrderActionInput;
}>;


export type OrderActionMutation = { orderAction: { id: number, content: string, orderId?: number | null, roomId: number, type: MessageType, createdAt: any, sender: { profile: { login: string, avatarPath: string } } } };

export type UpdatePageMutationVariables = Exact<{
  type: PageType;
  data: PageInput;
}>;


export type UpdatePageMutation = { updatePage: boolean };

export type DeleteRequestMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteRequestMutation = { deleteRequest: { id: number } };

export type DeleteRoomMutationVariables = Exact<{
  roomId: Scalars['Int']['input'];
}>;


export type DeleteRoomMutation = { deleteRoom: boolean };

export type CreateServiceMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateServiceMutation = { createService: { id: number } };

export type DeleteServiceMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteServiceMutation = { deleteService: { id: number } };

export type DuplicateServiceMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DuplicateServiceMutation = { duplicateService: { id: number } };

export type OrderServiceMutationVariables = Exact<{
  data: ServiceOrderInput;
}>;


export type OrderServiceMutation = { orderService: { content: string, sender: { profile: { login: string, avatarPath: string } }, room: { users: Array<{ profile: { login: string } }> } } };

export type ToggleServiceMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type ToggleServiceMutation = { toggleService: { id: number } };

export type UpdateServiceMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  data: ServiceInput;
}>;


export type UpdateServiceMutation = { updateService: { id: number } };

export type CreateFolderMutationVariables = Exact<{
  data: CreateFolderInput;
}>;


export type CreateFolderMutation = { createFolder: string };

export type DeleteFileOrFolderMutationVariables = Exact<{
  path: Scalars['String']['input'];
}>;


export type DeleteFileOrFolderMutation = { deleteFileOrFolder: string };

export type UploadFilesMutationVariables = Exact<{
  data: UploadFilesInput;
}>;


export type UploadFilesMutation = { uploadFiles: string };

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteUserMutation = { deleteUser: { id: number } };

export type ToggleFavoriteMutationVariables = Exact<{
  serviceSlug: Scalars['String']['input'];
}>;


export type ToggleFavoriteMutation = { toggleFavorite: { user: { id: number, roles: Array<UserRole>, profile: { email: string, login: string, avatarPath: string }, favorites: Array<{ slug: string }> } } };

export type UpdateProfileMutationVariables = Exact<{
  data: ProfileInput;
}>;


export type UpdateProfileMutation = { updateProfile: { user: { id: number, roles: Array<UserRole>, profile: { email: string, login: string, avatarPath: string }, favorites: Array<{ slug: string }> } } };

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  data: UserInput;
}>;


export type UpdateUserMutation = { updateUser: { id: number } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { logout: boolean };

export type JwtConfirmationMutationVariables = Exact<{
  data: JwtAuthConfirmationInput;
}>;


export type JwtConfirmationMutation = { jwtConfirmation: boolean };

export type JwtLoginMutationVariables = Exact<{
  data: JwtAuthLoginInput;
}>;


export type JwtLoginMutation = { jwtLogin: { user: { id: number, roles: Array<UserRole>, profile: { email: string, login: string, avatarPath: string }, favorites: Array<{ slug: string }> } } };

export type JwtResetMutationVariables = Exact<{
  data: JwtAuthResetInput;
}>;


export type JwtResetMutation = { jwtReset: boolean };

export type JwtVerificationMutationVariables = Exact<{
  data: JwtAuthVerificationInput;
}>;


export type JwtVerificationMutation = { jwtVerification: boolean };

export type SendRequestMutationVariables = Exact<{
  data: RequestInput;
}>;


export type SendRequestMutation = { sendRequest: { id: number } };

export type AnalyticsQueryVariables = Exact<{
  query: AnalyticsQueryInput;
}>;


export type AnalyticsQuery = { analytics: { onlineUsersCount: number, offlineUsersCount: number, inProcessOrdersCount: number, completedOrdersCount: number, canceledOrdersCount: number, expiredOrdersCount: number, refundedOrdersCount: number, totalEarned: number, topPurchasers: Array<{ login: string, avatarPath: string, ordersCount: number, ordersAmount: number }>, popularServices: Array<{ id: number, name: string, coverPath: string, categories: Array<string>, orderTimes: number }> } };

export type AttributeByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type AttributeByIdQuery = { attributeById: { name: string, properties: Array<{ name: string }> } };

export type AttributesQueryVariables = Exact<{
  query: QueryInput;
}>;


export type AttributesQuery = { attributes: { count: number, attributes: Array<{ id: number, name: string, properties: Array<{ name: string }> }> } };

export type CategoriesSelectQueryVariables = Exact<{
  query: CategoryQueryInput;
}>;


export type CategoriesSelectQuery = { categories: { categories: Array<{ id: number, name: string }> } };

export type CategoryByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type CategoryByIdQuery = { categoryById: { name: string, coverPath: string, parents: Array<{ id: number, name: string }>, seo?: { title: string, description: string, keywords: Array<string>, graphs?: { title: string, description: string, images: Array<{ url: string, alt: string }> } | null } | null, block?: { heading?: string | null, items: Array<{ heading?: string | null, content: string }> } | null } };

export type ExampleByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type ExampleByIdQuery = { exampleById: { name: string, url?: string | null, coverPath: string, imagePath: string, service?: { id: number, name: string } | null, user?: { id: number, profile: { login: string, email: string } } | null } };

export type ExamplesSelectQueryVariables = Exact<{
  query: QueryFullestInput;
}>;


export type ExamplesSelectQuery = { examples: { examples: Array<{ id: number, name: string }> } };

export type UserOrdersQueryVariables = Exact<{
  query: QueryInput;
}>;


export type UserOrdersQuery = { orders: Array<{ id: number, name: string, description: string, total: number, term: number, status: OrderStatus, createdAt: any, termUpdatedAt: any, partner: { userId: number, login: string, avatarPath: string } }> };

export type PageQueryVariables = Exact<{
  type: PageType;
}>;


export type PageQuery = { page: { block?: { heading?: string | null, items: Array<{ heading?: string | null, content: string }> } | null, seo?: { title: string, description: string, keywords: Array<string>, graphs?: { title: string, description: string, images: Array<{ url: string, alt: string }> } | null } | null } };

export type PropertiesSelectQueryVariables = Exact<{ [key: string]: never; }>;


export type PropertiesSelectQuery = { properties: Array<{ id: number, name: string, attribute: { name: string } }> };

export type RequestByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type RequestByIdQuery = { requestById: { firstName: string, lastName: string, email: string, message: string } };

export type ChangeRoomManagerMutationVariables = Exact<{
  data: ChangeRoomManagerInput;
}>;


export type ChangeRoomManagerMutation = { changeRoomManager: boolean };

export type CurrentRoomQueryVariables = Exact<{
  partnerLogin: Scalars['String']['input'];
  query: QueryInput;
}>;


export type CurrentRoomQuery = { currentRoom?: { id: number, partner: { id: number, profile: { login: string, avatarPath: string }, activity: { status: ActivityStatus, lastSeen: any } }, messages: Array<{ id: number, content: string, isChecked: boolean, type: MessageType, status: MessageStatus, updatedAt: any, createdAt: any, sender: { profile: { login: string, avatarPath: string } } }> } | null };

export type UserRoomsQueryVariables = Exact<{
  query: QueryInput;
}>;


export type UserRoomsQuery = { userRooms: Array<{ id: number, partner: { id: number, profile: { login: string, avatarPath: string }, activity: { status: ActivityStatus, lastSeen: any } }, lastMessage?: { id: number, content: string, senderId: number, type: MessageType, isChecked: boolean, status: MessageStatus, createdAt: any } | null }> };

export type ServiceByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type ServiceByIdQuery = { serviceById: { name: string, fromTerm: number, fromPrice: number, fromSalePrice?: number | null, excerpt: string, description: string, coverPath: string, videoPath: string, examples: Array<{ id: number, name: string }>, categories: Array<{ id: number, name: string }>, properties: Array<{ id: number, name: string }>, seo?: { title: string, description: string, keywords: Array<string>, graphs?: { title: string, description: string, images: Array<{ url: string, alt: string }> } | null } | null } };

export type ServicesSelectQueryVariables = Exact<{
  query: ServiceQueryInput;
}>;


export type ServicesSelectQuery = { services: { services: Array<{ id: number, name: string }> } };

export type GetFolderItemsQueryVariables = Exact<{
  folderPath: Scalars['String']['input'];
}>;


export type GetFolderItemsQuery = { folderItems: { folders: Array<{ name: string, size: string, count: number, path: string, createdAt: any }>, files: Array<{ name: string, size: string, extension: string, path: string, createdAt: any }> } };

export type FoldersQueryVariables = Exact<{ [key: string]: never; }>;


export type FoldersQuery = { folders: Array<{ name: string, path: string, createdAt: any, childrens: Array<{ name: string, path: string, createdAt: any, childrens: Array<{ name: string, path: string, createdAt: any, childrens: Array<{ name: string, path: string, createdAt: any, childrens: Array<{ name: string, path: string, createdAt: any, childrens: Array<{ name: string, path: string, createdAt: any, childrens: Array<{ name: string, path: string, createdAt: any, childrens: Array<{ name: string, path: string, createdAt: any, childrens: Array<{ name: string, path: string, createdAt: any, childrens: Array<{ name: string, path: string, createdAt: any }> }> }> }> }> }> }> }> }> }> };

export type NotificationMessagesQueryVariables = Exact<{ [key: string]: never; }>;


export type NotificationMessagesQuery = { notificationMessages: Array<{ id: number, content: string, status: MessageStatus, orderId?: number | null, roomId: number, type: MessageType, createdAt: any, sender: { profile: { login: string, avatarPath: string } }, room: { users: Array<{ profile: { login: string } }> } }> };

export type OtherManagersQueryVariables = Exact<{ [key: string]: never; }>;


export type OtherManagersQuery = { otherManagers: Array<{ id: number, profile: { login: string, avatarPath: string } }> };

export type UserByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type UserByIdQuery = { userById: { roles: Array<UserRole>, profile: { login: string }, bots: Array<{ token: string, chatId: string }> } };

export type UserFavoritesQueryVariables = Exact<{
  query: ServiceQueryInput;
}>;


export type UserFavoritesQuery = { userFavorites: { count: number, services: Array<{ name: string, slug: string, fromPrice: number, fromSalePrice?: number | null, fromTerm: number, excerpt: string, coverPath: string, videoPath: string, categories: Array<{ name: string, slug: string }> }> } };

export type UsersQueryVariables = Exact<{
  query: QueryInput;
}>;


export type UsersQuery = { users: { count: number, users: Array<{ id: number, roles: Array<UserRole>, profile: { avatarPath: string, email: string, login: string } }> } };

export type UsersSelectQueryVariables = Exact<{
  query: QueryInput;
}>;


export type UsersSelectQuery = { users: { users: Array<{ id: number, profile: { login: string, email: string } }> } };

export type JwtRegisterQueryVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type JwtRegisterQuery = { jwtRegister: { user: { id: number, roles: Array<UserRole>, profile: { email: string, login: string, avatarPath: string }, favorites: Array<{ slug: string }> } } };

export type CatalogQueryVariables = Exact<{
  data: CatalogInput;
}>;


export type CatalogQuery = { catalog: { categoryName?: string | null, categories: Array<{ name: string, slug: string, coverPath: string }>, filters?: { minPrice: number, maxPrice: number, minTerm: number, maxTerm: number, attributes: Array<{ name: string, slug: string, properties: Array<{ name: string, slug: string }> }> } | null, block?: { heading?: string | null, items: Array<{ heading?: string | null, content: string }> } | null, seo?: { title: string, description: string, keywords: Array<string>, graphs?: { title: string, description: string, images: Array<{ url: string, alt: string }> } | null } | null } };

export type CategoriesQueryVariables = Exact<{
  query: CategoryQueryInput;
}>;


export type CategoriesQuery = { categories: { count: number, categories: Array<{ id: number, name: string, slug: string, coverPath: string, visibility: Visibility }> } };

export type ExamplesQueryVariables = Exact<{
  query: QueryFullestInput;
}>;


export type ExamplesQuery = { examples: { count: number, examples: Array<{ id: number, name: string, slug: string, coverPath: string, imagePath: string, url?: string | null, visibility: Visibility, review?: { rating: number, comment: string, createdAt: any, user: { profile: { login: string, avatarPath: string } } } | null }> } };

export type PageBlockQueryVariables = Exact<{
  type: PageType;
}>;


export type PageBlockQuery = { pageBlock?: { heading?: string | null, items: Array<{ heading?: string | null, content: string }> } | null };

export type PageSeoQueryVariables = Exact<{
  type: PageType;
}>;


export type PageSeoQuery = { pageSeo?: { title: string, description: string, keywords: Array<string>, graphs?: { title: string, description: string, images: Array<{ url: string, alt: string }> } | null } | null };

export type RequestsQueryVariables = Exact<{
  query: QueryInput;
}>;


export type RequestsQuery = { requests: { count: number, requests: Array<{ id: number, firstName: string, lastName: string, email: string, message: string }> } };

export type ReviewsQueryVariables = Exact<{
  query: QueryInput;
  slug: Scalars['String']['input'];
}>;


export type ReviewsQuery = { reviews: { count: number, reviews: Array<{ id: number, rating: number, comment: string, createdAt: any, user: { id: number, profile: { login: string, avatarPath: string } } }> } };

export type CurrentServiceQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type CurrentServiceQuery = { currentService: { reviewsCount: number, service?: { id: number, name: string, slug: string, coverPath: string, videoPath: string, excerpt: string, description: string, fromPrice: number, fromSalePrice?: number | null, fromTerm: number, categories: Array<{ name: string, slug: string }>, examples: Array<{ name: string, slug: string, coverPath: string, imagePath: string, url?: string | null, review?: { rating: number, comment: string, createdAt: any, user: { profile: { login: string, avatarPath: string } } } | null }>, seo?: { title: string, description: string, keywords: Array<string>, graphs?: { title: string, description: string, images: Array<{ url: string, alt: string }> } | null } | null, reviews: Array<{ id: number, rating: number, comment: string, createdAt: any, user: { id: number, profile: { login: string, avatarPath: string } } }> } | null, similarServices: Array<{ name: string, slug: string, fromPrice: number, fromSalePrice?: number | null, fromTerm: number, excerpt: string, coverPath: string, videoPath: string, averageRating: number, categories: Array<{ name: string, slug: string }> }> } };

export type ServicesQueryVariables = Exact<{
  query: ServiceQueryInput;
  categorySlug?: InputMaybe<Scalars['String']['input']>;
}>;


export type ServicesQuery = { services: { count: number, services: Array<{ id: number, name: string, slug: string, fromPrice: number, fromSalePrice?: number | null, fromTerm: number, excerpt: string, coverPath: string, videoPath: string, averageRating: number, visibility: Visibility, categories: Array<{ name: string, slug: string }> }> } };

export type UserActivitySubscriptionVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type UserActivitySubscription = { userActivity?: { status: ActivityStatus, lastSeen: any } | null };

export type CheckedMessageSubscriptionVariables = Exact<{
  roomId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
}>;


export type CheckedMessageSubscription = { checkedMessage?: Array<number> | null };

export type NewLastMessageSubscriptionVariables = Exact<{
  roomId: Scalars['Int']['input'];
}>;


export type NewLastMessageSubscription = { roomMessages?: { id: number, type: MessageType, content: string, isChecked: boolean, status: MessageStatus, createdAt: any, sender: { id: number } } | null };

export type NewMessageSubscriptionVariables = Exact<{
  roomId: Scalars['Int']['input'];
}>;


export type NewMessageSubscription = { roomMessages?: { id: number, type: MessageType, content: string, isChecked: boolean, status: MessageStatus, updatedAt: any, createdAt: any, sender: { id: number, profile: { login: string, avatarPath: string } } } | null };

export type UserTypingSubscriptionVariables = Exact<{
  roomId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
}>;


export type UserTypingSubscription = { userTyping?: { isPartnerTyping: boolean } | null };

export type UserNotificationSubscriptionVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type UserNotificationSubscription = { userNotification?: { id: number, content: string, status: MessageStatus, roomId: number, orderId?: number | null, type: MessageType, createdAt: any, sender: { profile: { login: string, avatarPath: string } }, room: { users: Array<{ profile: { login: string } }> } } | null };


export const CreateAttributeDocument = gql`
    mutation CreateAttribute {
  createAttribute {
    id
  }
}
    `;
export type CreateAttributeMutationFn = Apollo.MutationFunction<CreateAttributeMutation, CreateAttributeMutationVariables>;

/**
 * __useCreateAttributeMutation__
 *
 * To run a mutation, you first call `useCreateAttributeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAttributeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAttributeMutation, { data, loading, error }] = useCreateAttributeMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateAttributeMutation(baseOptions?: Apollo.MutationHookOptions<CreateAttributeMutation, CreateAttributeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAttributeMutation, CreateAttributeMutationVariables>(CreateAttributeDocument, options);
      }
export type CreateAttributeMutationHookResult = ReturnType<typeof useCreateAttributeMutation>;
export type CreateAttributeMutationResult = Apollo.MutationResult<CreateAttributeMutation>;
export type CreateAttributeMutationOptions = Apollo.BaseMutationOptions<CreateAttributeMutation, CreateAttributeMutationVariables>;
export const DeleteAttributeDocument = gql`
    mutation DeleteAttribute($id: Int!) {
  deleteAttribute(id: $id) {
    id
  }
}
    `;
export type DeleteAttributeMutationFn = Apollo.MutationFunction<DeleteAttributeMutation, DeleteAttributeMutationVariables>;

/**
 * __useDeleteAttributeMutation__
 *
 * To run a mutation, you first call `useDeleteAttributeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAttributeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAttributeMutation, { data, loading, error }] = useDeleteAttributeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteAttributeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAttributeMutation, DeleteAttributeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAttributeMutation, DeleteAttributeMutationVariables>(DeleteAttributeDocument, options);
      }
export type DeleteAttributeMutationHookResult = ReturnType<typeof useDeleteAttributeMutation>;
export type DeleteAttributeMutationResult = Apollo.MutationResult<DeleteAttributeMutation>;
export type DeleteAttributeMutationOptions = Apollo.BaseMutationOptions<DeleteAttributeMutation, DeleteAttributeMutationVariables>;
export const DuplicateAttributeDocument = gql`
    mutation DuplicateAttribute($id: Int!) {
  duplicateAttribute(id: $id) {
    id
  }
}
    `;
export type DuplicateAttributeMutationFn = Apollo.MutationFunction<DuplicateAttributeMutation, DuplicateAttributeMutationVariables>;

/**
 * __useDuplicateAttributeMutation__
 *
 * To run a mutation, you first call `useDuplicateAttributeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDuplicateAttributeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [duplicateAttributeMutation, { data, loading, error }] = useDuplicateAttributeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDuplicateAttributeMutation(baseOptions?: Apollo.MutationHookOptions<DuplicateAttributeMutation, DuplicateAttributeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DuplicateAttributeMutation, DuplicateAttributeMutationVariables>(DuplicateAttributeDocument, options);
      }
export type DuplicateAttributeMutationHookResult = ReturnType<typeof useDuplicateAttributeMutation>;
export type DuplicateAttributeMutationResult = Apollo.MutationResult<DuplicateAttributeMutation>;
export type DuplicateAttributeMutationOptions = Apollo.BaseMutationOptions<DuplicateAttributeMutation, DuplicateAttributeMutationVariables>;
export const UpdateAttributeDocument = gql`
    mutation UpdateAttribute($id: Int!, $data: AttributeInput!) {
  updateAttribute(id: $id, data: $data) {
    id
  }
}
    `;
export type UpdateAttributeMutationFn = Apollo.MutationFunction<UpdateAttributeMutation, UpdateAttributeMutationVariables>;

/**
 * __useUpdateAttributeMutation__
 *
 * To run a mutation, you first call `useUpdateAttributeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAttributeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAttributeMutation, { data, loading, error }] = useUpdateAttributeMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateAttributeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAttributeMutation, UpdateAttributeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAttributeMutation, UpdateAttributeMutationVariables>(UpdateAttributeDocument, options);
      }
export type UpdateAttributeMutationHookResult = ReturnType<typeof useUpdateAttributeMutation>;
export type UpdateAttributeMutationResult = Apollo.MutationResult<UpdateAttributeMutation>;
export type UpdateAttributeMutationOptions = Apollo.BaseMutationOptions<UpdateAttributeMutation, UpdateAttributeMutationVariables>;
export const CreateCategoryDocument = gql`
    mutation CreateCategory {
  createCategory {
    id
  }
}
    `;
export type CreateCategoryMutationFn = Apollo.MutationFunction<CreateCategoryMutation, CreateCategoryMutationVariables>;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateCategoryMutation, CreateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument, options);
      }
export type CreateCategoryMutationHookResult = ReturnType<typeof useCreateCategoryMutation>;
export type CreateCategoryMutationResult = Apollo.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const DeleteCategoryDocument = gql`
    mutation DeleteCategory($id: Int!) {
  deleteCategory(id: $id) {
    id
  }
}
    `;
export type DeleteCategoryMutationFn = Apollo.MutationFunction<DeleteCategoryMutation, DeleteCategoryMutationVariables>;

/**
 * __useDeleteCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCategoryMutation, { data, loading, error }] = useDeleteCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCategoryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCategoryMutation, DeleteCategoryMutationVariables>(DeleteCategoryDocument, options);
      }
export type DeleteCategoryMutationHookResult = ReturnType<typeof useDeleteCategoryMutation>;
export type DeleteCategoryMutationResult = Apollo.MutationResult<DeleteCategoryMutation>;
export type DeleteCategoryMutationOptions = Apollo.BaseMutationOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>;
export const DuplicateCategoryDocument = gql`
    mutation DuplicateCategory($id: Int!) {
  duplicateCategory(id: $id) {
    id
  }
}
    `;
export type DuplicateCategoryMutationFn = Apollo.MutationFunction<DuplicateCategoryMutation, DuplicateCategoryMutationVariables>;

/**
 * __useDuplicateCategoryMutation__
 *
 * To run a mutation, you first call `useDuplicateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDuplicateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [duplicateCategoryMutation, { data, loading, error }] = useDuplicateCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDuplicateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<DuplicateCategoryMutation, DuplicateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DuplicateCategoryMutation, DuplicateCategoryMutationVariables>(DuplicateCategoryDocument, options);
      }
export type DuplicateCategoryMutationHookResult = ReturnType<typeof useDuplicateCategoryMutation>;
export type DuplicateCategoryMutationResult = Apollo.MutationResult<DuplicateCategoryMutation>;
export type DuplicateCategoryMutationOptions = Apollo.BaseMutationOptions<DuplicateCategoryMutation, DuplicateCategoryMutationVariables>;
export const ToggleCategoryDocument = gql`
    mutation ToggleCategory($id: Int!) {
  toggleCategory(id: $id) {
    id
  }
}
    `;
export type ToggleCategoryMutationFn = Apollo.MutationFunction<ToggleCategoryMutation, ToggleCategoryMutationVariables>;

/**
 * __useToggleCategoryMutation__
 *
 * To run a mutation, you first call `useToggleCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleCategoryMutation, { data, loading, error }] = useToggleCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useToggleCategoryMutation(baseOptions?: Apollo.MutationHookOptions<ToggleCategoryMutation, ToggleCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleCategoryMutation, ToggleCategoryMutationVariables>(ToggleCategoryDocument, options);
      }
export type ToggleCategoryMutationHookResult = ReturnType<typeof useToggleCategoryMutation>;
export type ToggleCategoryMutationResult = Apollo.MutationResult<ToggleCategoryMutation>;
export type ToggleCategoryMutationOptions = Apollo.BaseMutationOptions<ToggleCategoryMutation, ToggleCategoryMutationVariables>;
export const UpdateCategoryDocument = gql`
    mutation UpdateCategory($id: Int!, $data: CategoryInput!) {
  updateCategory(id: $id, data: $data) {
    id
  }
}
    `;
export type UpdateCategoryMutationFn = Apollo.MutationFunction<UpdateCategoryMutation, UpdateCategoryMutationVariables>;

/**
 * __useUpdateCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCategoryMutation, { data, loading, error }] = useUpdateCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCategoryMutation, UpdateCategoryMutationVariables>(UpdateCategoryDocument, options);
      }
export type UpdateCategoryMutationHookResult = ReturnType<typeof useUpdateCategoryMutation>;
export type UpdateCategoryMutationResult = Apollo.MutationResult<UpdateCategoryMutation>;
export type UpdateCategoryMutationOptions = Apollo.BaseMutationOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const AddExampleDocument = gql`
    mutation AddExample($data: AddExampleInput!) {
  addExample(data: $data) {
    id
  }
}
    `;
export type AddExampleMutationFn = Apollo.MutationFunction<AddExampleMutation, AddExampleMutationVariables>;

/**
 * __useAddExampleMutation__
 *
 * To run a mutation, you first call `useAddExampleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddExampleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addExampleMutation, { data, loading, error }] = useAddExampleMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddExampleMutation(baseOptions?: Apollo.MutationHookOptions<AddExampleMutation, AddExampleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddExampleMutation, AddExampleMutationVariables>(AddExampleDocument, options);
      }
export type AddExampleMutationHookResult = ReturnType<typeof useAddExampleMutation>;
export type AddExampleMutationResult = Apollo.MutationResult<AddExampleMutation>;
export type AddExampleMutationOptions = Apollo.BaseMutationOptions<AddExampleMutation, AddExampleMutationVariables>;
export const CreateExampleDocument = gql`
    mutation CreateExample {
  createExample {
    id
  }
}
    `;
export type CreateExampleMutationFn = Apollo.MutationFunction<CreateExampleMutation, CreateExampleMutationVariables>;

/**
 * __useCreateExampleMutation__
 *
 * To run a mutation, you first call `useCreateExampleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateExampleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createExampleMutation, { data, loading, error }] = useCreateExampleMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateExampleMutation(baseOptions?: Apollo.MutationHookOptions<CreateExampleMutation, CreateExampleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateExampleMutation, CreateExampleMutationVariables>(CreateExampleDocument, options);
      }
export type CreateExampleMutationHookResult = ReturnType<typeof useCreateExampleMutation>;
export type CreateExampleMutationResult = Apollo.MutationResult<CreateExampleMutation>;
export type CreateExampleMutationOptions = Apollo.BaseMutationOptions<CreateExampleMutation, CreateExampleMutationVariables>;
export const DeleteExampleDocument = gql`
    mutation DeleteExample($id: Int!) {
  deleteExample(id: $id) {
    id
  }
}
    `;
export type DeleteExampleMutationFn = Apollo.MutationFunction<DeleteExampleMutation, DeleteExampleMutationVariables>;

/**
 * __useDeleteExampleMutation__
 *
 * To run a mutation, you first call `useDeleteExampleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteExampleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteExampleMutation, { data, loading, error }] = useDeleteExampleMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteExampleMutation(baseOptions?: Apollo.MutationHookOptions<DeleteExampleMutation, DeleteExampleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteExampleMutation, DeleteExampleMutationVariables>(DeleteExampleDocument, options);
      }
export type DeleteExampleMutationHookResult = ReturnType<typeof useDeleteExampleMutation>;
export type DeleteExampleMutationResult = Apollo.MutationResult<DeleteExampleMutation>;
export type DeleteExampleMutationOptions = Apollo.BaseMutationOptions<DeleteExampleMutation, DeleteExampleMutationVariables>;
export const DuplicateExampleDocument = gql`
    mutation DuplicateExample($id: Int!) {
  duplicateExample(id: $id) {
    id
  }
}
    `;
export type DuplicateExampleMutationFn = Apollo.MutationFunction<DuplicateExampleMutation, DuplicateExampleMutationVariables>;

/**
 * __useDuplicateExampleMutation__
 *
 * To run a mutation, you first call `useDuplicateExampleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDuplicateExampleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [duplicateExampleMutation, { data, loading, error }] = useDuplicateExampleMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDuplicateExampleMutation(baseOptions?: Apollo.MutationHookOptions<DuplicateExampleMutation, DuplicateExampleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DuplicateExampleMutation, DuplicateExampleMutationVariables>(DuplicateExampleDocument, options);
      }
export type DuplicateExampleMutationHookResult = ReturnType<typeof useDuplicateExampleMutation>;
export type DuplicateExampleMutationResult = Apollo.MutationResult<DuplicateExampleMutation>;
export type DuplicateExampleMutationOptions = Apollo.BaseMutationOptions<DuplicateExampleMutation, DuplicateExampleMutationVariables>;
export const ToggleExampleDocument = gql`
    mutation ToggleExample($id: Int!) {
  toggleExample(id: $id) {
    id
  }
}
    `;
export type ToggleExampleMutationFn = Apollo.MutationFunction<ToggleExampleMutation, ToggleExampleMutationVariables>;

/**
 * __useToggleExampleMutation__
 *
 * To run a mutation, you first call `useToggleExampleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleExampleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleExampleMutation, { data, loading, error }] = useToggleExampleMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useToggleExampleMutation(baseOptions?: Apollo.MutationHookOptions<ToggleExampleMutation, ToggleExampleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleExampleMutation, ToggleExampleMutationVariables>(ToggleExampleDocument, options);
      }
export type ToggleExampleMutationHookResult = ReturnType<typeof useToggleExampleMutation>;
export type ToggleExampleMutationResult = Apollo.MutationResult<ToggleExampleMutation>;
export type ToggleExampleMutationOptions = Apollo.BaseMutationOptions<ToggleExampleMutation, ToggleExampleMutationVariables>;
export const UpdateExampleDocument = gql`
    mutation UpdateExample($id: Int!, $data: ExampleInput!) {
  updateExample(id: $id, data: $data) {
    id
  }
}
    `;
export type UpdateExampleMutationFn = Apollo.MutationFunction<UpdateExampleMutation, UpdateExampleMutationVariables>;

/**
 * __useUpdateExampleMutation__
 *
 * To run a mutation, you first call `useUpdateExampleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateExampleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateExampleMutation, { data, loading, error }] = useUpdateExampleMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateExampleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateExampleMutation, UpdateExampleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateExampleMutation, UpdateExampleMutationVariables>(UpdateExampleDocument, options);
      }
export type UpdateExampleMutationHookResult = ReturnType<typeof useUpdateExampleMutation>;
export type UpdateExampleMutationResult = Apollo.MutationResult<UpdateExampleMutation>;
export type UpdateExampleMutationOptions = Apollo.BaseMutationOptions<UpdateExampleMutation, UpdateExampleMutationVariables>;
export const CheckMessagesDocument = gql`
    mutation CheckMessages($roomId: Int!, $messagesIds: [Int!]!) {
  checkMessages(roomId: $roomId, messagesIds: $messagesIds)
}
    `;
export type CheckMessagesMutationFn = Apollo.MutationFunction<CheckMessagesMutation, CheckMessagesMutationVariables>;

/**
 * __useCheckMessagesMutation__
 *
 * To run a mutation, you first call `useCheckMessagesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCheckMessagesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [checkMessagesMutation, { data, loading, error }] = useCheckMessagesMutation({
 *   variables: {
 *      roomId: // value for 'roomId'
 *      messagesIds: // value for 'messagesIds'
 *   },
 * });
 */
export function useCheckMessagesMutation(baseOptions?: Apollo.MutationHookOptions<CheckMessagesMutation, CheckMessagesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CheckMessagesMutation, CheckMessagesMutationVariables>(CheckMessagesDocument, options);
      }
export type CheckMessagesMutationHookResult = ReturnType<typeof useCheckMessagesMutation>;
export type CheckMessagesMutationResult = Apollo.MutationResult<CheckMessagesMutation>;
export type CheckMessagesMutationOptions = Apollo.BaseMutationOptions<CheckMessagesMutation, CheckMessagesMutationVariables>;
export const CreateOfferDocument = gql`
    mutation CreateOffer($data: OfferInput!) {
  createOffer(data: $data) {
    content
    sender {
      profile {
        login
        avatarPath
      }
    }
    type
    status
  }
}
    `;
export type CreateOfferMutationFn = Apollo.MutationFunction<CreateOfferMutation, CreateOfferMutationVariables>;

/**
 * __useCreateOfferMutation__
 *
 * To run a mutation, you first call `useCreateOfferMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOfferMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOfferMutation, { data, loading, error }] = useCreateOfferMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateOfferMutation(baseOptions?: Apollo.MutationHookOptions<CreateOfferMutation, CreateOfferMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOfferMutation, CreateOfferMutationVariables>(CreateOfferDocument, options);
      }
export type CreateOfferMutationHookResult = ReturnType<typeof useCreateOfferMutation>;
export type CreateOfferMutationResult = Apollo.MutationResult<CreateOfferMutation>;
export type CreateOfferMutationOptions = Apollo.BaseMutationOptions<CreateOfferMutation, CreateOfferMutationVariables>;
export const CreateReviewOfferDocument = gql`
    mutation CreateReviewOffer($data: ReviewOfferInput!) {
  createReviewOffer(data: $data) {
    content
    sender {
      profile {
        login
        avatarPath
      }
    }
    type
    status
  }
}
    `;
export type CreateReviewOfferMutationFn = Apollo.MutationFunction<CreateReviewOfferMutation, CreateReviewOfferMutationVariables>;

/**
 * __useCreateReviewOfferMutation__
 *
 * To run a mutation, you first call `useCreateReviewOfferMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReviewOfferMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReviewOfferMutation, { data, loading, error }] = useCreateReviewOfferMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateReviewOfferMutation(baseOptions?: Apollo.MutationHookOptions<CreateReviewOfferMutation, CreateReviewOfferMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateReviewOfferMutation, CreateReviewOfferMutationVariables>(CreateReviewOfferDocument, options);
      }
export type CreateReviewOfferMutationHookResult = ReturnType<typeof useCreateReviewOfferMutation>;
export type CreateReviewOfferMutationResult = Apollo.MutationResult<CreateReviewOfferMutation>;
export type CreateReviewOfferMutationOptions = Apollo.BaseMutationOptions<CreateReviewOfferMutation, CreateReviewOfferMutationVariables>;
export const LeftReviewDocument = gql`
    mutation LeftReview($data: ReviewInput!) {
  leftReview(data: $data) {
    content
    sender {
      profile {
        login
        avatarPath
      }
    }
    type
    status
  }
}
    `;
export type LeftReviewMutationFn = Apollo.MutationFunction<LeftReviewMutation, LeftReviewMutationVariables>;

/**
 * __useLeftReviewMutation__
 *
 * To run a mutation, you first call `useLeftReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeftReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leftReviewMutation, { data, loading, error }] = useLeftReviewMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLeftReviewMutation(baseOptions?: Apollo.MutationHookOptions<LeftReviewMutation, LeftReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LeftReviewMutation, LeftReviewMutationVariables>(LeftReviewDocument, options);
      }
export type LeftReviewMutationHookResult = ReturnType<typeof useLeftReviewMutation>;
export type LeftReviewMutationResult = Apollo.MutationResult<LeftReviewMutation>;
export type LeftReviewMutationOptions = Apollo.BaseMutationOptions<LeftReviewMutation, LeftReviewMutationVariables>;
export const MessageActionDocument = gql`
    mutation MessageAction($data: MessageActionInput!) {
  messageAction(data: $data) {
    content
    sender {
      profile {
        login
        avatarPath
      }
    }
    type
    status
  }
}
    `;
export type MessageActionMutationFn = Apollo.MutationFunction<MessageActionMutation, MessageActionMutationVariables>;

/**
 * __useMessageActionMutation__
 *
 * To run a mutation, you first call `useMessageActionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMessageActionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [messageActionMutation, { data, loading, error }] = useMessageActionMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useMessageActionMutation(baseOptions?: Apollo.MutationHookOptions<MessageActionMutation, MessageActionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MessageActionMutation, MessageActionMutationVariables>(MessageActionDocument, options);
      }
export type MessageActionMutationHookResult = ReturnType<typeof useMessageActionMutation>;
export type MessageActionMutationResult = Apollo.MutationResult<MessageActionMutation>;
export type MessageActionMutationOptions = Apollo.BaseMutationOptions<MessageActionMutation, MessageActionMutationVariables>;
export const MessagesDocument = gql`
    mutation Messages($roomId: Int!, $query: QueryInput!) {
  messages(roomId: $roomId, query: $query) {
    id
    sender {
      profile {
        login
        avatarPath
      }
    }
    content
    isChecked
    type
    status
    updatedAt
    createdAt
  }
}
    `;
export type MessagesMutationFn = Apollo.MutationFunction<MessagesMutation, MessagesMutationVariables>;

/**
 * __useMessagesMutation__
 *
 * To run a mutation, you first call `useMessagesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMessagesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [messagesMutation, { data, loading, error }] = useMessagesMutation({
 *   variables: {
 *      roomId: // value for 'roomId'
 *      query: // value for 'query'
 *   },
 * });
 */
export function useMessagesMutation(baseOptions?: Apollo.MutationHookOptions<MessagesMutation, MessagesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MessagesMutation, MessagesMutationVariables>(MessagesDocument, options);
      }
export type MessagesMutationHookResult = ReturnType<typeof useMessagesMutation>;
export type MessagesMutationResult = Apollo.MutationResult<MessagesMutation>;
export type MessagesMutationOptions = Apollo.BaseMutationOptions<MessagesMutation, MessagesMutationVariables>;
export const ToggleTypingDocument = gql`
    mutation ToggleTyping($data: TypingInput!) {
  toggleTyping(data: $data)
}
    `;
export type ToggleTypingMutationFn = Apollo.MutationFunction<ToggleTypingMutation, ToggleTypingMutationVariables>;

/**
 * __useToggleTypingMutation__
 *
 * To run a mutation, you first call `useToggleTypingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleTypingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleTypingMutation, { data, loading, error }] = useToggleTypingMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useToggleTypingMutation(baseOptions?: Apollo.MutationHookOptions<ToggleTypingMutation, ToggleTypingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleTypingMutation, ToggleTypingMutationVariables>(ToggleTypingDocument, options);
      }
export type ToggleTypingMutationHookResult = ReturnType<typeof useToggleTypingMutation>;
export type ToggleTypingMutationResult = Apollo.MutationResult<ToggleTypingMutation>;
export type ToggleTypingMutationOptions = Apollo.BaseMutationOptions<ToggleTypingMutation, ToggleTypingMutationVariables>;
export const SendNewsletterDocument = gql`
    mutation SendNewsletter($data: NewsletterInput!) {
  sendNewsletter(data: $data)
}
    `;
export type SendNewsletterMutationFn = Apollo.MutationFunction<SendNewsletterMutation, SendNewsletterMutationVariables>;

/**
 * __useSendNewsletterMutation__
 *
 * To run a mutation, you first call `useSendNewsletterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendNewsletterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendNewsletterMutation, { data, loading, error }] = useSendNewsletterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSendNewsletterMutation(baseOptions?: Apollo.MutationHookOptions<SendNewsletterMutation, SendNewsletterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendNewsletterMutation, SendNewsletterMutationVariables>(SendNewsletterDocument, options);
      }
export type SendNewsletterMutationHookResult = ReturnType<typeof useSendNewsletterMutation>;
export type SendNewsletterMutationResult = Apollo.MutationResult<SendNewsletterMutation>;
export type SendNewsletterMutationOptions = Apollo.BaseMutationOptions<SendNewsletterMutation, SendNewsletterMutationVariables>;
export const OrderActionDocument = gql`
    mutation OrderAction($data: OrderActionInput!) {
  orderAction(data: $data) {
    id
    content
    sender {
      profile {
        login
        avatarPath
      }
    }
    orderId
    roomId
    type
    createdAt
  }
}
    `;
export type OrderActionMutationFn = Apollo.MutationFunction<OrderActionMutation, OrderActionMutationVariables>;

/**
 * __useOrderActionMutation__
 *
 * To run a mutation, you first call `useOrderActionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOrderActionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [orderActionMutation, { data, loading, error }] = useOrderActionMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useOrderActionMutation(baseOptions?: Apollo.MutationHookOptions<OrderActionMutation, OrderActionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<OrderActionMutation, OrderActionMutationVariables>(OrderActionDocument, options);
      }
export type OrderActionMutationHookResult = ReturnType<typeof useOrderActionMutation>;
export type OrderActionMutationResult = Apollo.MutationResult<OrderActionMutation>;
export type OrderActionMutationOptions = Apollo.BaseMutationOptions<OrderActionMutation, OrderActionMutationVariables>;
export const UpdatePageDocument = gql`
    mutation UpdatePage($type: PageType!, $data: PageInput!) {
  updatePage(type: $type, data: $data)
}
    `;
export type UpdatePageMutationFn = Apollo.MutationFunction<UpdatePageMutation, UpdatePageMutationVariables>;

/**
 * __useUpdatePageMutation__
 *
 * To run a mutation, you first call `useUpdatePageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePageMutation, { data, loading, error }] = useUpdatePageMutation({
 *   variables: {
 *      type: // value for 'type'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdatePageMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePageMutation, UpdatePageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePageMutation, UpdatePageMutationVariables>(UpdatePageDocument, options);
      }
export type UpdatePageMutationHookResult = ReturnType<typeof useUpdatePageMutation>;
export type UpdatePageMutationResult = Apollo.MutationResult<UpdatePageMutation>;
export type UpdatePageMutationOptions = Apollo.BaseMutationOptions<UpdatePageMutation, UpdatePageMutationVariables>;
export const DeleteRequestDocument = gql`
    mutation DeleteRequest($id: Int!) {
  deleteRequest(id: $id) {
    id
  }
}
    `;
export type DeleteRequestMutationFn = Apollo.MutationFunction<DeleteRequestMutation, DeleteRequestMutationVariables>;

/**
 * __useDeleteRequestMutation__
 *
 * To run a mutation, you first call `useDeleteRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRequestMutation, { data, loading, error }] = useDeleteRequestMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteRequestMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRequestMutation, DeleteRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteRequestMutation, DeleteRequestMutationVariables>(DeleteRequestDocument, options);
      }
export type DeleteRequestMutationHookResult = ReturnType<typeof useDeleteRequestMutation>;
export type DeleteRequestMutationResult = Apollo.MutationResult<DeleteRequestMutation>;
export type DeleteRequestMutationOptions = Apollo.BaseMutationOptions<DeleteRequestMutation, DeleteRequestMutationVariables>;
export const DeleteRoomDocument = gql`
    mutation DeleteRoom($roomId: Int!) {
  deleteRoom(roomId: $roomId)
}
    `;
export type DeleteRoomMutationFn = Apollo.MutationFunction<DeleteRoomMutation, DeleteRoomMutationVariables>;

/**
 * __useDeleteRoomMutation__
 *
 * To run a mutation, you first call `useDeleteRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRoomMutation, { data, loading, error }] = useDeleteRoomMutation({
 *   variables: {
 *      roomId: // value for 'roomId'
 *   },
 * });
 */
export function useDeleteRoomMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRoomMutation, DeleteRoomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteRoomMutation, DeleteRoomMutationVariables>(DeleteRoomDocument, options);
      }
export type DeleteRoomMutationHookResult = ReturnType<typeof useDeleteRoomMutation>;
export type DeleteRoomMutationResult = Apollo.MutationResult<DeleteRoomMutation>;
export type DeleteRoomMutationOptions = Apollo.BaseMutationOptions<DeleteRoomMutation, DeleteRoomMutationVariables>;
export const CreateServiceDocument = gql`
    mutation CreateService {
  createService {
    id
  }
}
    `;
export type CreateServiceMutationFn = Apollo.MutationFunction<CreateServiceMutation, CreateServiceMutationVariables>;

/**
 * __useCreateServiceMutation__
 *
 * To run a mutation, you first call `useCreateServiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateServiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createServiceMutation, { data, loading, error }] = useCreateServiceMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateServiceMutation(baseOptions?: Apollo.MutationHookOptions<CreateServiceMutation, CreateServiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateServiceMutation, CreateServiceMutationVariables>(CreateServiceDocument, options);
      }
export type CreateServiceMutationHookResult = ReturnType<typeof useCreateServiceMutation>;
export type CreateServiceMutationResult = Apollo.MutationResult<CreateServiceMutation>;
export type CreateServiceMutationOptions = Apollo.BaseMutationOptions<CreateServiceMutation, CreateServiceMutationVariables>;
export const DeleteServiceDocument = gql`
    mutation DeleteService($id: Int!) {
  deleteService(id: $id) {
    id
  }
}
    `;
export type DeleteServiceMutationFn = Apollo.MutationFunction<DeleteServiceMutation, DeleteServiceMutationVariables>;

/**
 * __useDeleteServiceMutation__
 *
 * To run a mutation, you first call `useDeleteServiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteServiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteServiceMutation, { data, loading, error }] = useDeleteServiceMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteServiceMutation(baseOptions?: Apollo.MutationHookOptions<DeleteServiceMutation, DeleteServiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteServiceMutation, DeleteServiceMutationVariables>(DeleteServiceDocument, options);
      }
export type DeleteServiceMutationHookResult = ReturnType<typeof useDeleteServiceMutation>;
export type DeleteServiceMutationResult = Apollo.MutationResult<DeleteServiceMutation>;
export type DeleteServiceMutationOptions = Apollo.BaseMutationOptions<DeleteServiceMutation, DeleteServiceMutationVariables>;
export const DuplicateServiceDocument = gql`
    mutation DuplicateService($id: Int!) {
  duplicateService(id: $id) {
    id
  }
}
    `;
export type DuplicateServiceMutationFn = Apollo.MutationFunction<DuplicateServiceMutation, DuplicateServiceMutationVariables>;

/**
 * __useDuplicateServiceMutation__
 *
 * To run a mutation, you first call `useDuplicateServiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDuplicateServiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [duplicateServiceMutation, { data, loading, error }] = useDuplicateServiceMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDuplicateServiceMutation(baseOptions?: Apollo.MutationHookOptions<DuplicateServiceMutation, DuplicateServiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DuplicateServiceMutation, DuplicateServiceMutationVariables>(DuplicateServiceDocument, options);
      }
export type DuplicateServiceMutationHookResult = ReturnType<typeof useDuplicateServiceMutation>;
export type DuplicateServiceMutationResult = Apollo.MutationResult<DuplicateServiceMutation>;
export type DuplicateServiceMutationOptions = Apollo.BaseMutationOptions<DuplicateServiceMutation, DuplicateServiceMutationVariables>;
export const OrderServiceDocument = gql`
    mutation OrderService($data: ServiceOrderInput!) {
  orderService(data: $data) {
    content
    sender {
      profile {
        login
        avatarPath
      }
    }
    room {
      users {
        profile {
          login
        }
      }
    }
  }
}
    `;
export type OrderServiceMutationFn = Apollo.MutationFunction<OrderServiceMutation, OrderServiceMutationVariables>;

/**
 * __useOrderServiceMutation__
 *
 * To run a mutation, you first call `useOrderServiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOrderServiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [orderServiceMutation, { data, loading, error }] = useOrderServiceMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useOrderServiceMutation(baseOptions?: Apollo.MutationHookOptions<OrderServiceMutation, OrderServiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<OrderServiceMutation, OrderServiceMutationVariables>(OrderServiceDocument, options);
      }
export type OrderServiceMutationHookResult = ReturnType<typeof useOrderServiceMutation>;
export type OrderServiceMutationResult = Apollo.MutationResult<OrderServiceMutation>;
export type OrderServiceMutationOptions = Apollo.BaseMutationOptions<OrderServiceMutation, OrderServiceMutationVariables>;
export const ToggleServiceDocument = gql`
    mutation ToggleService($id: Int!) {
  toggleService(id: $id) {
    id
  }
}
    `;
export type ToggleServiceMutationFn = Apollo.MutationFunction<ToggleServiceMutation, ToggleServiceMutationVariables>;

/**
 * __useToggleServiceMutation__
 *
 * To run a mutation, you first call `useToggleServiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleServiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleServiceMutation, { data, loading, error }] = useToggleServiceMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useToggleServiceMutation(baseOptions?: Apollo.MutationHookOptions<ToggleServiceMutation, ToggleServiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleServiceMutation, ToggleServiceMutationVariables>(ToggleServiceDocument, options);
      }
export type ToggleServiceMutationHookResult = ReturnType<typeof useToggleServiceMutation>;
export type ToggleServiceMutationResult = Apollo.MutationResult<ToggleServiceMutation>;
export type ToggleServiceMutationOptions = Apollo.BaseMutationOptions<ToggleServiceMutation, ToggleServiceMutationVariables>;
export const UpdateServiceDocument = gql`
    mutation UpdateService($id: Int!, $data: ServiceInput!) {
  updateService(id: $id, data: $data) {
    id
  }
}
    `;
export type UpdateServiceMutationFn = Apollo.MutationFunction<UpdateServiceMutation, UpdateServiceMutationVariables>;

/**
 * __useUpdateServiceMutation__
 *
 * To run a mutation, you first call `useUpdateServiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateServiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateServiceMutation, { data, loading, error }] = useUpdateServiceMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateServiceMutation(baseOptions?: Apollo.MutationHookOptions<UpdateServiceMutation, UpdateServiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateServiceMutation, UpdateServiceMutationVariables>(UpdateServiceDocument, options);
      }
export type UpdateServiceMutationHookResult = ReturnType<typeof useUpdateServiceMutation>;
export type UpdateServiceMutationResult = Apollo.MutationResult<UpdateServiceMutation>;
export type UpdateServiceMutationOptions = Apollo.BaseMutationOptions<UpdateServiceMutation, UpdateServiceMutationVariables>;
export const CreateFolderDocument = gql`
    mutation CreateFolder($data: CreateFolderInput!) {
  createFolder(data: $data)
}
    `;
export type CreateFolderMutationFn = Apollo.MutationFunction<CreateFolderMutation, CreateFolderMutationVariables>;

/**
 * __useCreateFolderMutation__
 *
 * To run a mutation, you first call `useCreateFolderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFolderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFolderMutation, { data, loading, error }] = useCreateFolderMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateFolderMutation(baseOptions?: Apollo.MutationHookOptions<CreateFolderMutation, CreateFolderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFolderMutation, CreateFolderMutationVariables>(CreateFolderDocument, options);
      }
export type CreateFolderMutationHookResult = ReturnType<typeof useCreateFolderMutation>;
export type CreateFolderMutationResult = Apollo.MutationResult<CreateFolderMutation>;
export type CreateFolderMutationOptions = Apollo.BaseMutationOptions<CreateFolderMutation, CreateFolderMutationVariables>;
export const DeleteFileOrFolderDocument = gql`
    mutation DeleteFileOrFolder($path: String!) {
  deleteFileOrFolder(path: $path)
}
    `;
export type DeleteFileOrFolderMutationFn = Apollo.MutationFunction<DeleteFileOrFolderMutation, DeleteFileOrFolderMutationVariables>;

/**
 * __useDeleteFileOrFolderMutation__
 *
 * To run a mutation, you first call `useDeleteFileOrFolderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFileOrFolderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFileOrFolderMutation, { data, loading, error }] = useDeleteFileOrFolderMutation({
 *   variables: {
 *      path: // value for 'path'
 *   },
 * });
 */
export function useDeleteFileOrFolderMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFileOrFolderMutation, DeleteFileOrFolderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteFileOrFolderMutation, DeleteFileOrFolderMutationVariables>(DeleteFileOrFolderDocument, options);
      }
export type DeleteFileOrFolderMutationHookResult = ReturnType<typeof useDeleteFileOrFolderMutation>;
export type DeleteFileOrFolderMutationResult = Apollo.MutationResult<DeleteFileOrFolderMutation>;
export type DeleteFileOrFolderMutationOptions = Apollo.BaseMutationOptions<DeleteFileOrFolderMutation, DeleteFileOrFolderMutationVariables>;
export const UploadFilesDocument = gql`
    mutation UploadFiles($data: UploadFilesInput!) {
  uploadFiles(data: $data)
}
    `;
export type UploadFilesMutationFn = Apollo.MutationFunction<UploadFilesMutation, UploadFilesMutationVariables>;

/**
 * __useUploadFilesMutation__
 *
 * To run a mutation, you first call `useUploadFilesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadFilesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadFilesMutation, { data, loading, error }] = useUploadFilesMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUploadFilesMutation(baseOptions?: Apollo.MutationHookOptions<UploadFilesMutation, UploadFilesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadFilesMutation, UploadFilesMutationVariables>(UploadFilesDocument, options);
      }
export type UploadFilesMutationHookResult = ReturnType<typeof useUploadFilesMutation>;
export type UploadFilesMutationResult = Apollo.MutationResult<UploadFilesMutation>;
export type UploadFilesMutationOptions = Apollo.BaseMutationOptions<UploadFilesMutation, UploadFilesMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser($id: Int!) {
  deleteUser(id: $id) {
    id
  }
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const ToggleFavoriteDocument = gql`
    mutation ToggleFavorite($serviceSlug: String!) {
  toggleFavorite(serviceSlug: $serviceSlug) {
    user {
      id
      profile {
        email
        login
        avatarPath
      }
      favorites {
        slug
      }
      roles
    }
  }
}
    `;
export type ToggleFavoriteMutationFn = Apollo.MutationFunction<ToggleFavoriteMutation, ToggleFavoriteMutationVariables>;

/**
 * __useToggleFavoriteMutation__
 *
 * To run a mutation, you first call `useToggleFavoriteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleFavoriteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleFavoriteMutation, { data, loading, error }] = useToggleFavoriteMutation({
 *   variables: {
 *      serviceSlug: // value for 'serviceSlug'
 *   },
 * });
 */
export function useToggleFavoriteMutation(baseOptions?: Apollo.MutationHookOptions<ToggleFavoriteMutation, ToggleFavoriteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleFavoriteMutation, ToggleFavoriteMutationVariables>(ToggleFavoriteDocument, options);
      }
export type ToggleFavoriteMutationHookResult = ReturnType<typeof useToggleFavoriteMutation>;
export type ToggleFavoriteMutationResult = Apollo.MutationResult<ToggleFavoriteMutation>;
export type ToggleFavoriteMutationOptions = Apollo.BaseMutationOptions<ToggleFavoriteMutation, ToggleFavoriteMutationVariables>;
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($data: ProfileInput!) {
  updateProfile(data: $data) {
    user {
      id
      profile {
        email
        login
        avatarPath
      }
      favorites {
        slug
      }
      roles
    }
  }
}
    `;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($id: Int!, $data: UserInput!) {
  updateUser(id: $id, data: $data) {
    id
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const JwtConfirmationDocument = gql`
    mutation JwtConfirmation($data: JwtAuthConfirmationInput!) {
  jwtConfirmation(data: $data)
}
    `;
export type JwtConfirmationMutationFn = Apollo.MutationFunction<JwtConfirmationMutation, JwtConfirmationMutationVariables>;

/**
 * __useJwtConfirmationMutation__
 *
 * To run a mutation, you first call `useJwtConfirmationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJwtConfirmationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [jwtConfirmationMutation, { data, loading, error }] = useJwtConfirmationMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useJwtConfirmationMutation(baseOptions?: Apollo.MutationHookOptions<JwtConfirmationMutation, JwtConfirmationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JwtConfirmationMutation, JwtConfirmationMutationVariables>(JwtConfirmationDocument, options);
      }
export type JwtConfirmationMutationHookResult = ReturnType<typeof useJwtConfirmationMutation>;
export type JwtConfirmationMutationResult = Apollo.MutationResult<JwtConfirmationMutation>;
export type JwtConfirmationMutationOptions = Apollo.BaseMutationOptions<JwtConfirmationMutation, JwtConfirmationMutationVariables>;
export const JwtLoginDocument = gql`
    mutation JwtLogin($data: JwtAuthLoginInput!) {
  jwtLogin(data: $data) {
    user {
      id
      profile {
        email
        login
        avatarPath
      }
      favorites {
        slug
      }
      roles
    }
  }
}
    `;
export type JwtLoginMutationFn = Apollo.MutationFunction<JwtLoginMutation, JwtLoginMutationVariables>;

/**
 * __useJwtLoginMutation__
 *
 * To run a mutation, you first call `useJwtLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJwtLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [jwtLoginMutation, { data, loading, error }] = useJwtLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useJwtLoginMutation(baseOptions?: Apollo.MutationHookOptions<JwtLoginMutation, JwtLoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JwtLoginMutation, JwtLoginMutationVariables>(JwtLoginDocument, options);
      }
export type JwtLoginMutationHookResult = ReturnType<typeof useJwtLoginMutation>;
export type JwtLoginMutationResult = Apollo.MutationResult<JwtLoginMutation>;
export type JwtLoginMutationOptions = Apollo.BaseMutationOptions<JwtLoginMutation, JwtLoginMutationVariables>;
export const JwtResetDocument = gql`
    mutation JwtReset($data: JwtAuthResetInput!) {
  jwtReset(data: $data)
}
    `;
export type JwtResetMutationFn = Apollo.MutationFunction<JwtResetMutation, JwtResetMutationVariables>;

/**
 * __useJwtResetMutation__
 *
 * To run a mutation, you first call `useJwtResetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJwtResetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [jwtResetMutation, { data, loading, error }] = useJwtResetMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useJwtResetMutation(baseOptions?: Apollo.MutationHookOptions<JwtResetMutation, JwtResetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JwtResetMutation, JwtResetMutationVariables>(JwtResetDocument, options);
      }
export type JwtResetMutationHookResult = ReturnType<typeof useJwtResetMutation>;
export type JwtResetMutationResult = Apollo.MutationResult<JwtResetMutation>;
export type JwtResetMutationOptions = Apollo.BaseMutationOptions<JwtResetMutation, JwtResetMutationVariables>;
export const JwtVerificationDocument = gql`
    mutation JwtVerification($data: JwtAuthVerificationInput!) {
  jwtVerification(data: $data)
}
    `;
export type JwtVerificationMutationFn = Apollo.MutationFunction<JwtVerificationMutation, JwtVerificationMutationVariables>;

/**
 * __useJwtVerificationMutation__
 *
 * To run a mutation, you first call `useJwtVerificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJwtVerificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [jwtVerificationMutation, { data, loading, error }] = useJwtVerificationMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useJwtVerificationMutation(baseOptions?: Apollo.MutationHookOptions<JwtVerificationMutation, JwtVerificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JwtVerificationMutation, JwtVerificationMutationVariables>(JwtVerificationDocument, options);
      }
export type JwtVerificationMutationHookResult = ReturnType<typeof useJwtVerificationMutation>;
export type JwtVerificationMutationResult = Apollo.MutationResult<JwtVerificationMutation>;
export type JwtVerificationMutationOptions = Apollo.BaseMutationOptions<JwtVerificationMutation, JwtVerificationMutationVariables>;
export const SendRequestDocument = gql`
    mutation SendRequest($data: RequestInput!) {
  sendRequest(data: $data) {
    id
  }
}
    `;
export type SendRequestMutationFn = Apollo.MutationFunction<SendRequestMutation, SendRequestMutationVariables>;

/**
 * __useSendRequestMutation__
 *
 * To run a mutation, you first call `useSendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendRequestMutation, { data, loading, error }] = useSendRequestMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSendRequestMutation(baseOptions?: Apollo.MutationHookOptions<SendRequestMutation, SendRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendRequestMutation, SendRequestMutationVariables>(SendRequestDocument, options);
      }
export type SendRequestMutationHookResult = ReturnType<typeof useSendRequestMutation>;
export type SendRequestMutationResult = Apollo.MutationResult<SendRequestMutation>;
export type SendRequestMutationOptions = Apollo.BaseMutationOptions<SendRequestMutation, SendRequestMutationVariables>;
export const AnalyticsDocument = gql`
    query Analytics($query: AnalyticsQueryInput!) {
  analytics(query: $query) {
    onlineUsersCount
    offlineUsersCount
    topPurchasers {
      login
      avatarPath
      ordersCount
      ordersAmount
    }
    popularServices {
      id
      name
      coverPath
      categories
      orderTimes
    }
    inProcessOrdersCount
    completedOrdersCount
    canceledOrdersCount
    expiredOrdersCount
    refundedOrdersCount
    totalEarned
  }
}
    `;

/**
 * __useAnalyticsQuery__
 *
 * To run a query within a React component, call `useAnalyticsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAnalyticsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAnalyticsQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useAnalyticsQuery(baseOptions: Apollo.QueryHookOptions<AnalyticsQuery, AnalyticsQueryVariables> & ({ variables: AnalyticsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AnalyticsQuery, AnalyticsQueryVariables>(AnalyticsDocument, options);
      }
export function useAnalyticsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AnalyticsQuery, AnalyticsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AnalyticsQuery, AnalyticsQueryVariables>(AnalyticsDocument, options);
        }
export function useAnalyticsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AnalyticsQuery, AnalyticsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AnalyticsQuery, AnalyticsQueryVariables>(AnalyticsDocument, options);
        }
export type AnalyticsQueryHookResult = ReturnType<typeof useAnalyticsQuery>;
export type AnalyticsLazyQueryHookResult = ReturnType<typeof useAnalyticsLazyQuery>;
export type AnalyticsSuspenseQueryHookResult = ReturnType<typeof useAnalyticsSuspenseQuery>;
export type AnalyticsQueryResult = Apollo.QueryResult<AnalyticsQuery, AnalyticsQueryVariables>;
export const AttributeByIdDocument = gql`
    query AttributeById($id: Int!) {
  attributeById(id: $id) {
    name
    properties {
      name
    }
  }
}
    `;

/**
 * __useAttributeByIdQuery__
 *
 * To run a query within a React component, call `useAttributeByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useAttributeByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAttributeByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAttributeByIdQuery(baseOptions: Apollo.QueryHookOptions<AttributeByIdQuery, AttributeByIdQueryVariables> & ({ variables: AttributeByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AttributeByIdQuery, AttributeByIdQueryVariables>(AttributeByIdDocument, options);
      }
export function useAttributeByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AttributeByIdQuery, AttributeByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AttributeByIdQuery, AttributeByIdQueryVariables>(AttributeByIdDocument, options);
        }
export function useAttributeByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AttributeByIdQuery, AttributeByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AttributeByIdQuery, AttributeByIdQueryVariables>(AttributeByIdDocument, options);
        }
export type AttributeByIdQueryHookResult = ReturnType<typeof useAttributeByIdQuery>;
export type AttributeByIdLazyQueryHookResult = ReturnType<typeof useAttributeByIdLazyQuery>;
export type AttributeByIdSuspenseQueryHookResult = ReturnType<typeof useAttributeByIdSuspenseQuery>;
export type AttributeByIdQueryResult = Apollo.QueryResult<AttributeByIdQuery, AttributeByIdQueryVariables>;
export const AttributesDocument = gql`
    query Attributes($query: QueryInput!) {
  attributes(query: $query) {
    attributes {
      id
      name
      properties {
        name
      }
    }
    count
  }
}
    `;

/**
 * __useAttributesQuery__
 *
 * To run a query within a React component, call `useAttributesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAttributesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAttributesQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useAttributesQuery(baseOptions: Apollo.QueryHookOptions<AttributesQuery, AttributesQueryVariables> & ({ variables: AttributesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AttributesQuery, AttributesQueryVariables>(AttributesDocument, options);
      }
export function useAttributesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AttributesQuery, AttributesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AttributesQuery, AttributesQueryVariables>(AttributesDocument, options);
        }
export function useAttributesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AttributesQuery, AttributesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AttributesQuery, AttributesQueryVariables>(AttributesDocument, options);
        }
export type AttributesQueryHookResult = ReturnType<typeof useAttributesQuery>;
export type AttributesLazyQueryHookResult = ReturnType<typeof useAttributesLazyQuery>;
export type AttributesSuspenseQueryHookResult = ReturnType<typeof useAttributesSuspenseQuery>;
export type AttributesQueryResult = Apollo.QueryResult<AttributesQuery, AttributesQueryVariables>;
export const CategoriesSelectDocument = gql`
    query CategoriesSelect($query: CategoryQueryInput!) {
  categories(query: $query) {
    categories {
      id
      name
    }
  }
}
    `;

/**
 * __useCategoriesSelectQuery__
 *
 * To run a query within a React component, call `useCategoriesSelectQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesSelectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesSelectQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useCategoriesSelectQuery(baseOptions: Apollo.QueryHookOptions<CategoriesSelectQuery, CategoriesSelectQueryVariables> & ({ variables: CategoriesSelectQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoriesSelectQuery, CategoriesSelectQueryVariables>(CategoriesSelectDocument, options);
      }
export function useCategoriesSelectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoriesSelectQuery, CategoriesSelectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoriesSelectQuery, CategoriesSelectQueryVariables>(CategoriesSelectDocument, options);
        }
export function useCategoriesSelectSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CategoriesSelectQuery, CategoriesSelectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CategoriesSelectQuery, CategoriesSelectQueryVariables>(CategoriesSelectDocument, options);
        }
export type CategoriesSelectQueryHookResult = ReturnType<typeof useCategoriesSelectQuery>;
export type CategoriesSelectLazyQueryHookResult = ReturnType<typeof useCategoriesSelectLazyQuery>;
export type CategoriesSelectSuspenseQueryHookResult = ReturnType<typeof useCategoriesSelectSuspenseQuery>;
export type CategoriesSelectQueryResult = Apollo.QueryResult<CategoriesSelectQuery, CategoriesSelectQueryVariables>;
export const CategoryByIdDocument = gql`
    query CategoryById($id: Int!) {
  categoryById(id: $id) {
    name
    coverPath
    parents {
      id
      name
    }
    seo {
      title
      description
      keywords
      graphs {
        title
        description
        images {
          url
          alt
        }
      }
    }
    block {
      heading
      items {
        heading
        content
      }
    }
  }
}
    `;

/**
 * __useCategoryByIdQuery__
 *
 * To run a query within a React component, call `useCategoryByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoryByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoryByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCategoryByIdQuery(baseOptions: Apollo.QueryHookOptions<CategoryByIdQuery, CategoryByIdQueryVariables> & ({ variables: CategoryByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoryByIdQuery, CategoryByIdQueryVariables>(CategoryByIdDocument, options);
      }
export function useCategoryByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoryByIdQuery, CategoryByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoryByIdQuery, CategoryByIdQueryVariables>(CategoryByIdDocument, options);
        }
export function useCategoryByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CategoryByIdQuery, CategoryByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CategoryByIdQuery, CategoryByIdQueryVariables>(CategoryByIdDocument, options);
        }
export type CategoryByIdQueryHookResult = ReturnType<typeof useCategoryByIdQuery>;
export type CategoryByIdLazyQueryHookResult = ReturnType<typeof useCategoryByIdLazyQuery>;
export type CategoryByIdSuspenseQueryHookResult = ReturnType<typeof useCategoryByIdSuspenseQuery>;
export type CategoryByIdQueryResult = Apollo.QueryResult<CategoryByIdQuery, CategoryByIdQueryVariables>;
export const ExampleByIdDocument = gql`
    query ExampleById($id: Int!) {
  exampleById(id: $id) {
    name
    url
    coverPath
    imagePath
    service {
      id
      name
    }
    user {
      id
      profile {
        login
        email
      }
    }
  }
}
    `;

/**
 * __useExampleByIdQuery__
 *
 * To run a query within a React component, call `useExampleByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useExampleByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExampleByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useExampleByIdQuery(baseOptions: Apollo.QueryHookOptions<ExampleByIdQuery, ExampleByIdQueryVariables> & ({ variables: ExampleByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExampleByIdQuery, ExampleByIdQueryVariables>(ExampleByIdDocument, options);
      }
export function useExampleByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExampleByIdQuery, ExampleByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExampleByIdQuery, ExampleByIdQueryVariables>(ExampleByIdDocument, options);
        }
export function useExampleByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ExampleByIdQuery, ExampleByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ExampleByIdQuery, ExampleByIdQueryVariables>(ExampleByIdDocument, options);
        }
export type ExampleByIdQueryHookResult = ReturnType<typeof useExampleByIdQuery>;
export type ExampleByIdLazyQueryHookResult = ReturnType<typeof useExampleByIdLazyQuery>;
export type ExampleByIdSuspenseQueryHookResult = ReturnType<typeof useExampleByIdSuspenseQuery>;
export type ExampleByIdQueryResult = Apollo.QueryResult<ExampleByIdQuery, ExampleByIdQueryVariables>;
export const ExamplesSelectDocument = gql`
    query ExamplesSelect($query: QueryFullestInput!) {
  examples(query: $query) {
    examples {
      id
      name
    }
  }
}
    `;

/**
 * __useExamplesSelectQuery__
 *
 * To run a query within a React component, call `useExamplesSelectQuery` and pass it any options that fit your needs.
 * When your component renders, `useExamplesSelectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExamplesSelectQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useExamplesSelectQuery(baseOptions: Apollo.QueryHookOptions<ExamplesSelectQuery, ExamplesSelectQueryVariables> & ({ variables: ExamplesSelectQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExamplesSelectQuery, ExamplesSelectQueryVariables>(ExamplesSelectDocument, options);
      }
export function useExamplesSelectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExamplesSelectQuery, ExamplesSelectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExamplesSelectQuery, ExamplesSelectQueryVariables>(ExamplesSelectDocument, options);
        }
export function useExamplesSelectSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ExamplesSelectQuery, ExamplesSelectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ExamplesSelectQuery, ExamplesSelectQueryVariables>(ExamplesSelectDocument, options);
        }
export type ExamplesSelectQueryHookResult = ReturnType<typeof useExamplesSelectQuery>;
export type ExamplesSelectLazyQueryHookResult = ReturnType<typeof useExamplesSelectLazyQuery>;
export type ExamplesSelectSuspenseQueryHookResult = ReturnType<typeof useExamplesSelectSuspenseQuery>;
export type ExamplesSelectQueryResult = Apollo.QueryResult<ExamplesSelectQuery, ExamplesSelectQueryVariables>;
export const UserOrdersDocument = gql`
    query UserOrders($query: QueryInput!) {
  orders(query: $query) {
    id
    name
    description
    total
    term
    partner {
      userId
      login
      avatarPath
    }
    status
    createdAt
    termUpdatedAt
  }
}
    `;

/**
 * __useUserOrdersQuery__
 *
 * To run a query within a React component, call `useUserOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserOrdersQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useUserOrdersQuery(baseOptions: Apollo.QueryHookOptions<UserOrdersQuery, UserOrdersQueryVariables> & ({ variables: UserOrdersQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserOrdersQuery, UserOrdersQueryVariables>(UserOrdersDocument, options);
      }
export function useUserOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserOrdersQuery, UserOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserOrdersQuery, UserOrdersQueryVariables>(UserOrdersDocument, options);
        }
export function useUserOrdersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UserOrdersQuery, UserOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserOrdersQuery, UserOrdersQueryVariables>(UserOrdersDocument, options);
        }
export type UserOrdersQueryHookResult = ReturnType<typeof useUserOrdersQuery>;
export type UserOrdersLazyQueryHookResult = ReturnType<typeof useUserOrdersLazyQuery>;
export type UserOrdersSuspenseQueryHookResult = ReturnType<typeof useUserOrdersSuspenseQuery>;
export type UserOrdersQueryResult = Apollo.QueryResult<UserOrdersQuery, UserOrdersQueryVariables>;
export const PageDocument = gql`
    query Page($type: PageType!) {
  page(type: $type) {
    block {
      heading
      items {
        heading
        content
      }
    }
    seo {
      title
      description
      keywords
      graphs {
        title
        description
        images {
          url
          alt
        }
      }
    }
  }
}
    `;

/**
 * __usePageQuery__
 *
 * To run a query within a React component, call `usePageQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageQuery({
 *   variables: {
 *      type: // value for 'type'
 *   },
 * });
 */
export function usePageQuery(baseOptions: Apollo.QueryHookOptions<PageQuery, PageQueryVariables> & ({ variables: PageQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PageQuery, PageQueryVariables>(PageDocument, options);
      }
export function usePageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageQuery, PageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PageQuery, PageQueryVariables>(PageDocument, options);
        }
export function usePageSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PageQuery, PageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PageQuery, PageQueryVariables>(PageDocument, options);
        }
export type PageQueryHookResult = ReturnType<typeof usePageQuery>;
export type PageLazyQueryHookResult = ReturnType<typeof usePageLazyQuery>;
export type PageSuspenseQueryHookResult = ReturnType<typeof usePageSuspenseQuery>;
export type PageQueryResult = Apollo.QueryResult<PageQuery, PageQueryVariables>;
export const PropertiesSelectDocument = gql`
    query PropertiesSelect {
  properties {
    id
    name
    attribute {
      name
    }
  }
}
    `;

/**
 * __usePropertiesSelectQuery__
 *
 * To run a query within a React component, call `usePropertiesSelectQuery` and pass it any options that fit your needs.
 * When your component renders, `usePropertiesSelectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePropertiesSelectQuery({
 *   variables: {
 *   },
 * });
 */
export function usePropertiesSelectQuery(baseOptions?: Apollo.QueryHookOptions<PropertiesSelectQuery, PropertiesSelectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PropertiesSelectQuery, PropertiesSelectQueryVariables>(PropertiesSelectDocument, options);
      }
export function usePropertiesSelectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PropertiesSelectQuery, PropertiesSelectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PropertiesSelectQuery, PropertiesSelectQueryVariables>(PropertiesSelectDocument, options);
        }
export function usePropertiesSelectSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PropertiesSelectQuery, PropertiesSelectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PropertiesSelectQuery, PropertiesSelectQueryVariables>(PropertiesSelectDocument, options);
        }
export type PropertiesSelectQueryHookResult = ReturnType<typeof usePropertiesSelectQuery>;
export type PropertiesSelectLazyQueryHookResult = ReturnType<typeof usePropertiesSelectLazyQuery>;
export type PropertiesSelectSuspenseQueryHookResult = ReturnType<typeof usePropertiesSelectSuspenseQuery>;
export type PropertiesSelectQueryResult = Apollo.QueryResult<PropertiesSelectQuery, PropertiesSelectQueryVariables>;
export const RequestByIdDocument = gql`
    query RequestById($id: Int!) {
  requestById(id: $id) {
    firstName
    lastName
    email
    message
  }
}
    `;

/**
 * __useRequestByIdQuery__
 *
 * To run a query within a React component, call `useRequestByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useRequestByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRequestByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRequestByIdQuery(baseOptions: Apollo.QueryHookOptions<RequestByIdQuery, RequestByIdQueryVariables> & ({ variables: RequestByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RequestByIdQuery, RequestByIdQueryVariables>(RequestByIdDocument, options);
      }
export function useRequestByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RequestByIdQuery, RequestByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RequestByIdQuery, RequestByIdQueryVariables>(RequestByIdDocument, options);
        }
export function useRequestByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<RequestByIdQuery, RequestByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RequestByIdQuery, RequestByIdQueryVariables>(RequestByIdDocument, options);
        }
export type RequestByIdQueryHookResult = ReturnType<typeof useRequestByIdQuery>;
export type RequestByIdLazyQueryHookResult = ReturnType<typeof useRequestByIdLazyQuery>;
export type RequestByIdSuspenseQueryHookResult = ReturnType<typeof useRequestByIdSuspenseQuery>;
export type RequestByIdQueryResult = Apollo.QueryResult<RequestByIdQuery, RequestByIdQueryVariables>;
export const ChangeRoomManagerDocument = gql`
    mutation ChangeRoomManager($data: ChangeRoomManagerInput!) {
  changeRoomManager(data: $data)
}
    `;
export type ChangeRoomManagerMutationFn = Apollo.MutationFunction<ChangeRoomManagerMutation, ChangeRoomManagerMutationVariables>;

/**
 * __useChangeRoomManagerMutation__
 *
 * To run a mutation, you first call `useChangeRoomManagerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeRoomManagerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeRoomManagerMutation, { data, loading, error }] = useChangeRoomManagerMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangeRoomManagerMutation(baseOptions?: Apollo.MutationHookOptions<ChangeRoomManagerMutation, ChangeRoomManagerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeRoomManagerMutation, ChangeRoomManagerMutationVariables>(ChangeRoomManagerDocument, options);
      }
export type ChangeRoomManagerMutationHookResult = ReturnType<typeof useChangeRoomManagerMutation>;
export type ChangeRoomManagerMutationResult = Apollo.MutationResult<ChangeRoomManagerMutation>;
export type ChangeRoomManagerMutationOptions = Apollo.BaseMutationOptions<ChangeRoomManagerMutation, ChangeRoomManagerMutationVariables>;
export const CurrentRoomDocument = gql`
    query CurrentRoom($partnerLogin: String!, $query: QueryInput!) {
  currentRoom(partnerLogin: $partnerLogin, query: $query) {
    id
    partner {
      id
      profile {
        login
        avatarPath
      }
      activity {
        status
        lastSeen
      }
    }
    messages {
      id
      sender {
        profile {
          login
          avatarPath
        }
      }
      content
      isChecked
      type
      status
      updatedAt
      createdAt
    }
  }
}
    `;

/**
 * __useCurrentRoomQuery__
 *
 * To run a query within a React component, call `useCurrentRoomQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentRoomQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentRoomQuery({
 *   variables: {
 *      partnerLogin: // value for 'partnerLogin'
 *      query: // value for 'query'
 *   },
 * });
 */
export function useCurrentRoomQuery(baseOptions: Apollo.QueryHookOptions<CurrentRoomQuery, CurrentRoomQueryVariables> & ({ variables: CurrentRoomQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentRoomQuery, CurrentRoomQueryVariables>(CurrentRoomDocument, options);
      }
export function useCurrentRoomLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentRoomQuery, CurrentRoomQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentRoomQuery, CurrentRoomQueryVariables>(CurrentRoomDocument, options);
        }
export function useCurrentRoomSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CurrentRoomQuery, CurrentRoomQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CurrentRoomQuery, CurrentRoomQueryVariables>(CurrentRoomDocument, options);
        }
export type CurrentRoomQueryHookResult = ReturnType<typeof useCurrentRoomQuery>;
export type CurrentRoomLazyQueryHookResult = ReturnType<typeof useCurrentRoomLazyQuery>;
export type CurrentRoomSuspenseQueryHookResult = ReturnType<typeof useCurrentRoomSuspenseQuery>;
export type CurrentRoomQueryResult = Apollo.QueryResult<CurrentRoomQuery, CurrentRoomQueryVariables>;
export const UserRoomsDocument = gql`
    query UserRooms($query: QueryInput!) {
  userRooms(query: $query) {
    id
    partner {
      id
      profile {
        login
        avatarPath
      }
      activity {
        status
        lastSeen
      }
    }
    lastMessage {
      id
      content
      senderId
      type
      isChecked
      type
      status
      createdAt
    }
  }
}
    `;

/**
 * __useUserRoomsQuery__
 *
 * To run a query within a React component, call `useUserRoomsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserRoomsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserRoomsQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useUserRoomsQuery(baseOptions: Apollo.QueryHookOptions<UserRoomsQuery, UserRoomsQueryVariables> & ({ variables: UserRoomsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserRoomsQuery, UserRoomsQueryVariables>(UserRoomsDocument, options);
      }
export function useUserRoomsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserRoomsQuery, UserRoomsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserRoomsQuery, UserRoomsQueryVariables>(UserRoomsDocument, options);
        }
export function useUserRoomsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UserRoomsQuery, UserRoomsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserRoomsQuery, UserRoomsQueryVariables>(UserRoomsDocument, options);
        }
export type UserRoomsQueryHookResult = ReturnType<typeof useUserRoomsQuery>;
export type UserRoomsLazyQueryHookResult = ReturnType<typeof useUserRoomsLazyQuery>;
export type UserRoomsSuspenseQueryHookResult = ReturnType<typeof useUserRoomsSuspenseQuery>;
export type UserRoomsQueryResult = Apollo.QueryResult<UserRoomsQuery, UserRoomsQueryVariables>;
export const ServiceByIdDocument = gql`
    query ServiceById($id: Int!) {
  serviceById(id: $id) {
    name
    fromTerm
    fromPrice
    fromSalePrice
    examples {
      id
      name
    }
    categories {
      id
      name
    }
    properties {
      id
      name
    }
    excerpt
    description
    coverPath
    videoPath
    seo {
      title
      description
      keywords
      graphs {
        title
        description
        images {
          url
          alt
        }
      }
    }
  }
}
    `;

/**
 * __useServiceByIdQuery__
 *
 * To run a query within a React component, call `useServiceByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useServiceByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useServiceByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useServiceByIdQuery(baseOptions: Apollo.QueryHookOptions<ServiceByIdQuery, ServiceByIdQueryVariables> & ({ variables: ServiceByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ServiceByIdQuery, ServiceByIdQueryVariables>(ServiceByIdDocument, options);
      }
export function useServiceByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ServiceByIdQuery, ServiceByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ServiceByIdQuery, ServiceByIdQueryVariables>(ServiceByIdDocument, options);
        }
export function useServiceByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ServiceByIdQuery, ServiceByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ServiceByIdQuery, ServiceByIdQueryVariables>(ServiceByIdDocument, options);
        }
export type ServiceByIdQueryHookResult = ReturnType<typeof useServiceByIdQuery>;
export type ServiceByIdLazyQueryHookResult = ReturnType<typeof useServiceByIdLazyQuery>;
export type ServiceByIdSuspenseQueryHookResult = ReturnType<typeof useServiceByIdSuspenseQuery>;
export type ServiceByIdQueryResult = Apollo.QueryResult<ServiceByIdQuery, ServiceByIdQueryVariables>;
export const ServicesSelectDocument = gql`
    query ServicesSelect($query: ServiceQueryInput!) {
  services(query: $query) {
    services {
      id
      name
    }
  }
}
    `;

/**
 * __useServicesSelectQuery__
 *
 * To run a query within a React component, call `useServicesSelectQuery` and pass it any options that fit your needs.
 * When your component renders, `useServicesSelectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useServicesSelectQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useServicesSelectQuery(baseOptions: Apollo.QueryHookOptions<ServicesSelectQuery, ServicesSelectQueryVariables> & ({ variables: ServicesSelectQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ServicesSelectQuery, ServicesSelectQueryVariables>(ServicesSelectDocument, options);
      }
export function useServicesSelectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ServicesSelectQuery, ServicesSelectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ServicesSelectQuery, ServicesSelectQueryVariables>(ServicesSelectDocument, options);
        }
export function useServicesSelectSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ServicesSelectQuery, ServicesSelectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ServicesSelectQuery, ServicesSelectQueryVariables>(ServicesSelectDocument, options);
        }
export type ServicesSelectQueryHookResult = ReturnType<typeof useServicesSelectQuery>;
export type ServicesSelectLazyQueryHookResult = ReturnType<typeof useServicesSelectLazyQuery>;
export type ServicesSelectSuspenseQueryHookResult = ReturnType<typeof useServicesSelectSuspenseQuery>;
export type ServicesSelectQueryResult = Apollo.QueryResult<ServicesSelectQuery, ServicesSelectQueryVariables>;
export const GetFolderItemsDocument = gql`
    query GetFolderItems($folderPath: String!) {
  folderItems(folderPath: $folderPath) {
    folders {
      name
      size
      count
      path
      createdAt
    }
    files {
      name
      size
      extension
      path
      createdAt
    }
  }
}
    `;

/**
 * __useGetFolderItemsQuery__
 *
 * To run a query within a React component, call `useGetFolderItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFolderItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFolderItemsQuery({
 *   variables: {
 *      folderPath: // value for 'folderPath'
 *   },
 * });
 */
export function useGetFolderItemsQuery(baseOptions: Apollo.QueryHookOptions<GetFolderItemsQuery, GetFolderItemsQueryVariables> & ({ variables: GetFolderItemsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFolderItemsQuery, GetFolderItemsQueryVariables>(GetFolderItemsDocument, options);
      }
export function useGetFolderItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFolderItemsQuery, GetFolderItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFolderItemsQuery, GetFolderItemsQueryVariables>(GetFolderItemsDocument, options);
        }
export function useGetFolderItemsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetFolderItemsQuery, GetFolderItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetFolderItemsQuery, GetFolderItemsQueryVariables>(GetFolderItemsDocument, options);
        }
export type GetFolderItemsQueryHookResult = ReturnType<typeof useGetFolderItemsQuery>;
export type GetFolderItemsLazyQueryHookResult = ReturnType<typeof useGetFolderItemsLazyQuery>;
export type GetFolderItemsSuspenseQueryHookResult = ReturnType<typeof useGetFolderItemsSuspenseQuery>;
export type GetFolderItemsQueryResult = Apollo.QueryResult<GetFolderItemsQuery, GetFolderItemsQueryVariables>;
export const FoldersDocument = gql`
    query Folders {
  folders {
    name
    path
    childrens {
      name
      path
      childrens {
        name
        path
        childrens {
          name
          path
          childrens {
            name
            path
            childrens {
              name
              path
              childrens {
                name
                path
                childrens {
                  name
                  path
                  childrens {
                    name
                    path
                    childrens {
                      name
                      path
                      createdAt
                    }
                    createdAt
                  }
                  createdAt
                }
                createdAt
              }
              createdAt
            }
            createdAt
          }
          createdAt
        }
        createdAt
      }
      createdAt
    }
    createdAt
  }
}
    `;

/**
 * __useFoldersQuery__
 *
 * To run a query within a React component, call `useFoldersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFoldersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFoldersQuery({
 *   variables: {
 *   },
 * });
 */
export function useFoldersQuery(baseOptions?: Apollo.QueryHookOptions<FoldersQuery, FoldersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FoldersQuery, FoldersQueryVariables>(FoldersDocument, options);
      }
export function useFoldersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FoldersQuery, FoldersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FoldersQuery, FoldersQueryVariables>(FoldersDocument, options);
        }
export function useFoldersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FoldersQuery, FoldersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FoldersQuery, FoldersQueryVariables>(FoldersDocument, options);
        }
export type FoldersQueryHookResult = ReturnType<typeof useFoldersQuery>;
export type FoldersLazyQueryHookResult = ReturnType<typeof useFoldersLazyQuery>;
export type FoldersSuspenseQueryHookResult = ReturnType<typeof useFoldersSuspenseQuery>;
export type FoldersQueryResult = Apollo.QueryResult<FoldersQuery, FoldersQueryVariables>;
export const NotificationMessagesDocument = gql`
    query NotificationMessages {
  notificationMessages {
    id
    content
    sender {
      profile {
        login
        avatarPath
      }
    }
    room {
      users {
        profile {
          login
        }
      }
    }
    status
    orderId
    roomId
    type
    createdAt
  }
}
    `;

/**
 * __useNotificationMessagesQuery__
 *
 * To run a query within a React component, call `useNotificationMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotificationMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationMessagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useNotificationMessagesQuery(baseOptions?: Apollo.QueryHookOptions<NotificationMessagesQuery, NotificationMessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NotificationMessagesQuery, NotificationMessagesQueryVariables>(NotificationMessagesDocument, options);
      }
export function useNotificationMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NotificationMessagesQuery, NotificationMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NotificationMessagesQuery, NotificationMessagesQueryVariables>(NotificationMessagesDocument, options);
        }
export function useNotificationMessagesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<NotificationMessagesQuery, NotificationMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<NotificationMessagesQuery, NotificationMessagesQueryVariables>(NotificationMessagesDocument, options);
        }
export type NotificationMessagesQueryHookResult = ReturnType<typeof useNotificationMessagesQuery>;
export type NotificationMessagesLazyQueryHookResult = ReturnType<typeof useNotificationMessagesLazyQuery>;
export type NotificationMessagesSuspenseQueryHookResult = ReturnType<typeof useNotificationMessagesSuspenseQuery>;
export type NotificationMessagesQueryResult = Apollo.QueryResult<NotificationMessagesQuery, NotificationMessagesQueryVariables>;
export const OtherManagersDocument = gql`
    query OtherManagers {
  otherManagers {
    id
    profile {
      login
      avatarPath
    }
  }
}
    `;

/**
 * __useOtherManagersQuery__
 *
 * To run a query within a React component, call `useOtherManagersQuery` and pass it any options that fit your needs.
 * When your component renders, `useOtherManagersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOtherManagersQuery({
 *   variables: {
 *   },
 * });
 */
export function useOtherManagersQuery(baseOptions?: Apollo.QueryHookOptions<OtherManagersQuery, OtherManagersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OtherManagersQuery, OtherManagersQueryVariables>(OtherManagersDocument, options);
      }
export function useOtherManagersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OtherManagersQuery, OtherManagersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OtherManagersQuery, OtherManagersQueryVariables>(OtherManagersDocument, options);
        }
export function useOtherManagersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<OtherManagersQuery, OtherManagersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OtherManagersQuery, OtherManagersQueryVariables>(OtherManagersDocument, options);
        }
export type OtherManagersQueryHookResult = ReturnType<typeof useOtherManagersQuery>;
export type OtherManagersLazyQueryHookResult = ReturnType<typeof useOtherManagersLazyQuery>;
export type OtherManagersSuspenseQueryHookResult = ReturnType<typeof useOtherManagersSuspenseQuery>;
export type OtherManagersQueryResult = Apollo.QueryResult<OtherManagersQuery, OtherManagersQueryVariables>;
export const UserByIdDocument = gql`
    query UserById($id: Int!) {
  userById(id: $id) {
    profile {
      login
    }
    bots {
      token
      chatId
    }
    roles
  }
}
    `;

/**
 * __useUserByIdQuery__
 *
 * To run a query within a React component, call `useUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserByIdQuery(baseOptions: Apollo.QueryHookOptions<UserByIdQuery, UserByIdQueryVariables> & ({ variables: UserByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserByIdQuery, UserByIdQueryVariables>(UserByIdDocument, options);
      }
export function useUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserByIdQuery, UserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserByIdQuery, UserByIdQueryVariables>(UserByIdDocument, options);
        }
export function useUserByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UserByIdQuery, UserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserByIdQuery, UserByIdQueryVariables>(UserByIdDocument, options);
        }
export type UserByIdQueryHookResult = ReturnType<typeof useUserByIdQuery>;
export type UserByIdLazyQueryHookResult = ReturnType<typeof useUserByIdLazyQuery>;
export type UserByIdSuspenseQueryHookResult = ReturnType<typeof useUserByIdSuspenseQuery>;
export type UserByIdQueryResult = Apollo.QueryResult<UserByIdQuery, UserByIdQueryVariables>;
export const UserFavoritesDocument = gql`
    query UserFavorites($query: ServiceQueryInput!) {
  userFavorites(query: $query) {
    services {
      name
      slug
      fromPrice
      fromSalePrice
      fromTerm
      excerpt
      coverPath
      videoPath
      categories {
        name
        slug
      }
    }
    count
  }
}
    `;

/**
 * __useUserFavoritesQuery__
 *
 * To run a query within a React component, call `useUserFavoritesQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserFavoritesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserFavoritesQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useUserFavoritesQuery(baseOptions: Apollo.QueryHookOptions<UserFavoritesQuery, UserFavoritesQueryVariables> & ({ variables: UserFavoritesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserFavoritesQuery, UserFavoritesQueryVariables>(UserFavoritesDocument, options);
      }
export function useUserFavoritesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserFavoritesQuery, UserFavoritesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserFavoritesQuery, UserFavoritesQueryVariables>(UserFavoritesDocument, options);
        }
export function useUserFavoritesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UserFavoritesQuery, UserFavoritesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserFavoritesQuery, UserFavoritesQueryVariables>(UserFavoritesDocument, options);
        }
export type UserFavoritesQueryHookResult = ReturnType<typeof useUserFavoritesQuery>;
export type UserFavoritesLazyQueryHookResult = ReturnType<typeof useUserFavoritesLazyQuery>;
export type UserFavoritesSuspenseQueryHookResult = ReturnType<typeof useUserFavoritesSuspenseQuery>;
export type UserFavoritesQueryResult = Apollo.QueryResult<UserFavoritesQuery, UserFavoritesQueryVariables>;
export const UsersDocument = gql`
    query Users($query: QueryInput!) {
  users(query: $query) {
    users {
      id
      profile {
        avatarPath
        email
        login
      }
      roles
    }
    count
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useUsersQuery(baseOptions: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables> & ({ variables: UsersQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export function useUsersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersSuspenseQueryHookResult = ReturnType<typeof useUsersSuspenseQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const UsersSelectDocument = gql`
    query UsersSelect($query: QueryInput!) {
  users(query: $query) {
    users {
      id
      profile {
        login
        email
      }
    }
  }
}
    `;

/**
 * __useUsersSelectQuery__
 *
 * To run a query within a React component, call `useUsersSelectQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersSelectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersSelectQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useUsersSelectQuery(baseOptions: Apollo.QueryHookOptions<UsersSelectQuery, UsersSelectQueryVariables> & ({ variables: UsersSelectQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersSelectQuery, UsersSelectQueryVariables>(UsersSelectDocument, options);
      }
export function useUsersSelectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersSelectQuery, UsersSelectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersSelectQuery, UsersSelectQueryVariables>(UsersSelectDocument, options);
        }
export function useUsersSelectSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UsersSelectQuery, UsersSelectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UsersSelectQuery, UsersSelectQueryVariables>(UsersSelectDocument, options);
        }
export type UsersSelectQueryHookResult = ReturnType<typeof useUsersSelectQuery>;
export type UsersSelectLazyQueryHookResult = ReturnType<typeof useUsersSelectLazyQuery>;
export type UsersSelectSuspenseQueryHookResult = ReturnType<typeof useUsersSelectSuspenseQuery>;
export type UsersSelectQueryResult = Apollo.QueryResult<UsersSelectQuery, UsersSelectQueryVariables>;
export const JwtRegisterDocument = gql`
    query JwtRegister($token: String!) {
  jwtRegister(token: $token) {
    user {
      id
      profile {
        email
        login
        avatarPath
      }
      favorites {
        slug
      }
      roles
    }
  }
}
    `;

/**
 * __useJwtRegisterQuery__
 *
 * To run a query within a React component, call `useJwtRegisterQuery` and pass it any options that fit your needs.
 * When your component renders, `useJwtRegisterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useJwtRegisterQuery({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useJwtRegisterQuery(baseOptions: Apollo.QueryHookOptions<JwtRegisterQuery, JwtRegisterQueryVariables> & ({ variables: JwtRegisterQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<JwtRegisterQuery, JwtRegisterQueryVariables>(JwtRegisterDocument, options);
      }
export function useJwtRegisterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<JwtRegisterQuery, JwtRegisterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<JwtRegisterQuery, JwtRegisterQueryVariables>(JwtRegisterDocument, options);
        }
export function useJwtRegisterSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<JwtRegisterQuery, JwtRegisterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<JwtRegisterQuery, JwtRegisterQueryVariables>(JwtRegisterDocument, options);
        }
export type JwtRegisterQueryHookResult = ReturnType<typeof useJwtRegisterQuery>;
export type JwtRegisterLazyQueryHookResult = ReturnType<typeof useJwtRegisterLazyQuery>;
export type JwtRegisterSuspenseQueryHookResult = ReturnType<typeof useJwtRegisterSuspenseQuery>;
export type JwtRegisterQueryResult = Apollo.QueryResult<JwtRegisterQuery, JwtRegisterQueryVariables>;
export const CatalogDocument = gql`
    query Catalog($data: CatalogInput!) {
  catalog(data: $data) {
    categories {
      name
      slug
      coverPath
    }
    filters {
      attributes {
        name
        slug
        properties {
          name
          slug
        }
      }
      minPrice
      maxPrice
      minTerm
      maxTerm
    }
    categoryName
    block {
      heading
      items {
        heading
        content
      }
    }
    seo {
      title
      description
      keywords
      graphs {
        title
        description
        images {
          url
          alt
        }
      }
    }
  }
}
    `;

/**
 * __useCatalogQuery__
 *
 * To run a query within a React component, call `useCatalogQuery` and pass it any options that fit your needs.
 * When your component renders, `useCatalogQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCatalogQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCatalogQuery(baseOptions: Apollo.QueryHookOptions<CatalogQuery, CatalogQueryVariables> & ({ variables: CatalogQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CatalogQuery, CatalogQueryVariables>(CatalogDocument, options);
      }
export function useCatalogLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CatalogQuery, CatalogQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CatalogQuery, CatalogQueryVariables>(CatalogDocument, options);
        }
export function useCatalogSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CatalogQuery, CatalogQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CatalogQuery, CatalogQueryVariables>(CatalogDocument, options);
        }
export type CatalogQueryHookResult = ReturnType<typeof useCatalogQuery>;
export type CatalogLazyQueryHookResult = ReturnType<typeof useCatalogLazyQuery>;
export type CatalogSuspenseQueryHookResult = ReturnType<typeof useCatalogSuspenseQuery>;
export type CatalogQueryResult = Apollo.QueryResult<CatalogQuery, CatalogQueryVariables>;
export const CategoriesDocument = gql`
    query Categories($query: CategoryQueryInput!) {
  categories(query: $query) {
    categories {
      id
      name
      slug
      coverPath
      visibility
    }
    count
  }
}
    `;

/**
 * __useCategoriesQuery__
 *
 * To run a query within a React component, call `useCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useCategoriesQuery(baseOptions: Apollo.QueryHookOptions<CategoriesQuery, CategoriesQueryVariables> & ({ variables: CategoriesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
      }
export function useCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
        }
export function useCategoriesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
        }
export type CategoriesQueryHookResult = ReturnType<typeof useCategoriesQuery>;
export type CategoriesLazyQueryHookResult = ReturnType<typeof useCategoriesLazyQuery>;
export type CategoriesSuspenseQueryHookResult = ReturnType<typeof useCategoriesSuspenseQuery>;
export type CategoriesQueryResult = Apollo.QueryResult<CategoriesQuery, CategoriesQueryVariables>;
export const ExamplesDocument = gql`
    query Examples($query: QueryFullestInput!) {
  examples(query: $query) {
    examples {
      id
      name
      slug
      coverPath
      imagePath
      url
      visibility
      review {
        rating
        comment
        user {
          profile {
            login
            avatarPath
          }
        }
        createdAt
      }
    }
    count
  }
}
    `;

/**
 * __useExamplesQuery__
 *
 * To run a query within a React component, call `useExamplesQuery` and pass it any options that fit your needs.
 * When your component renders, `useExamplesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExamplesQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useExamplesQuery(baseOptions: Apollo.QueryHookOptions<ExamplesQuery, ExamplesQueryVariables> & ({ variables: ExamplesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExamplesQuery, ExamplesQueryVariables>(ExamplesDocument, options);
      }
export function useExamplesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExamplesQuery, ExamplesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExamplesQuery, ExamplesQueryVariables>(ExamplesDocument, options);
        }
export function useExamplesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ExamplesQuery, ExamplesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ExamplesQuery, ExamplesQueryVariables>(ExamplesDocument, options);
        }
export type ExamplesQueryHookResult = ReturnType<typeof useExamplesQuery>;
export type ExamplesLazyQueryHookResult = ReturnType<typeof useExamplesLazyQuery>;
export type ExamplesSuspenseQueryHookResult = ReturnType<typeof useExamplesSuspenseQuery>;
export type ExamplesQueryResult = Apollo.QueryResult<ExamplesQuery, ExamplesQueryVariables>;
export const PageBlockDocument = gql`
    query PageBlock($type: PageType!) {
  pageBlock(type: $type) {
    heading
    items {
      heading
      content
    }
  }
}
    `;

/**
 * __usePageBlockQuery__
 *
 * To run a query within a React component, call `usePageBlockQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageBlockQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageBlockQuery({
 *   variables: {
 *      type: // value for 'type'
 *   },
 * });
 */
export function usePageBlockQuery(baseOptions: Apollo.QueryHookOptions<PageBlockQuery, PageBlockQueryVariables> & ({ variables: PageBlockQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PageBlockQuery, PageBlockQueryVariables>(PageBlockDocument, options);
      }
export function usePageBlockLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageBlockQuery, PageBlockQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PageBlockQuery, PageBlockQueryVariables>(PageBlockDocument, options);
        }
export function usePageBlockSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PageBlockQuery, PageBlockQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PageBlockQuery, PageBlockQueryVariables>(PageBlockDocument, options);
        }
export type PageBlockQueryHookResult = ReturnType<typeof usePageBlockQuery>;
export type PageBlockLazyQueryHookResult = ReturnType<typeof usePageBlockLazyQuery>;
export type PageBlockSuspenseQueryHookResult = ReturnType<typeof usePageBlockSuspenseQuery>;
export type PageBlockQueryResult = Apollo.QueryResult<PageBlockQuery, PageBlockQueryVariables>;
export const PageSeoDocument = gql`
    query PageSeo($type: PageType!) {
  pageSeo(type: $type) {
    title
    description
    keywords
    graphs {
      title
      description
      images {
        url
        alt
      }
    }
  }
}
    `;

/**
 * __usePageSeoQuery__
 *
 * To run a query within a React component, call `usePageSeoQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageSeoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageSeoQuery({
 *   variables: {
 *      type: // value for 'type'
 *   },
 * });
 */
export function usePageSeoQuery(baseOptions: Apollo.QueryHookOptions<PageSeoQuery, PageSeoQueryVariables> & ({ variables: PageSeoQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PageSeoQuery, PageSeoQueryVariables>(PageSeoDocument, options);
      }
export function usePageSeoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageSeoQuery, PageSeoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PageSeoQuery, PageSeoQueryVariables>(PageSeoDocument, options);
        }
export function usePageSeoSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PageSeoQuery, PageSeoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PageSeoQuery, PageSeoQueryVariables>(PageSeoDocument, options);
        }
export type PageSeoQueryHookResult = ReturnType<typeof usePageSeoQuery>;
export type PageSeoLazyQueryHookResult = ReturnType<typeof usePageSeoLazyQuery>;
export type PageSeoSuspenseQueryHookResult = ReturnType<typeof usePageSeoSuspenseQuery>;
export type PageSeoQueryResult = Apollo.QueryResult<PageSeoQuery, PageSeoQueryVariables>;
export const RequestsDocument = gql`
    query Requests($query: QueryInput!) {
  requests(query: $query) {
    requests {
      id
      firstName
      lastName
      email
      message
    }
    count
  }
}
    `;

/**
 * __useRequestsQuery__
 *
 * To run a query within a React component, call `useRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRequestsQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useRequestsQuery(baseOptions: Apollo.QueryHookOptions<RequestsQuery, RequestsQueryVariables> & ({ variables: RequestsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RequestsQuery, RequestsQueryVariables>(RequestsDocument, options);
      }
export function useRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RequestsQuery, RequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RequestsQuery, RequestsQueryVariables>(RequestsDocument, options);
        }
export function useRequestsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<RequestsQuery, RequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RequestsQuery, RequestsQueryVariables>(RequestsDocument, options);
        }
export type RequestsQueryHookResult = ReturnType<typeof useRequestsQuery>;
export type RequestsLazyQueryHookResult = ReturnType<typeof useRequestsLazyQuery>;
export type RequestsSuspenseQueryHookResult = ReturnType<typeof useRequestsSuspenseQuery>;
export type RequestsQueryResult = Apollo.QueryResult<RequestsQuery, RequestsQueryVariables>;
export const ReviewsDocument = gql`
    query Reviews($query: QueryInput!, $slug: String!) {
  reviews(query: $query, slug: $slug) {
    reviews {
      id
      rating
      comment
      user {
        id
        profile {
          login
          avatarPath
        }
      }
      createdAt
    }
    count
  }
}
    `;

/**
 * __useReviewsQuery__
 *
 * To run a query within a React component, call `useReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReviewsQuery({
 *   variables: {
 *      query: // value for 'query'
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useReviewsQuery(baseOptions: Apollo.QueryHookOptions<ReviewsQuery, ReviewsQueryVariables> & ({ variables: ReviewsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReviewsQuery, ReviewsQueryVariables>(ReviewsDocument, options);
      }
export function useReviewsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReviewsQuery, ReviewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReviewsQuery, ReviewsQueryVariables>(ReviewsDocument, options);
        }
export function useReviewsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ReviewsQuery, ReviewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ReviewsQuery, ReviewsQueryVariables>(ReviewsDocument, options);
        }
export type ReviewsQueryHookResult = ReturnType<typeof useReviewsQuery>;
export type ReviewsLazyQueryHookResult = ReturnType<typeof useReviewsLazyQuery>;
export type ReviewsSuspenseQueryHookResult = ReturnType<typeof useReviewsSuspenseQuery>;
export type ReviewsQueryResult = Apollo.QueryResult<ReviewsQuery, ReviewsQueryVariables>;
export const CurrentServiceDocument = gql`
    query CurrentService($slug: String!) {
  currentService(slug: $slug) {
    service {
      id
      name
      slug
      coverPath
      videoPath
      excerpt
      description
      fromPrice
      fromSalePrice
      fromTerm
      categories {
        name
        slug
      }
      examples {
        name
        slug
        coverPath
        imagePath
        url
        review {
          rating
          comment
          user {
            profile {
              login
              avatarPath
            }
          }
          createdAt
        }
      }
      seo {
        title
        description
        keywords
        graphs {
          title
          description
          images {
            url
            alt
          }
        }
      }
      reviews {
        id
        rating
        comment
        user {
          id
          profile {
            login
            avatarPath
          }
        }
        createdAt
      }
    }
    similarServices {
      name
      slug
      fromPrice
      fromSalePrice
      fromTerm
      excerpt
      coverPath
      videoPath
      categories {
        name
        slug
      }
      averageRating
    }
    reviewsCount
  }
}
    `;

/**
 * __useCurrentServiceQuery__
 *
 * To run a query within a React component, call `useCurrentServiceQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentServiceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentServiceQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useCurrentServiceQuery(baseOptions: Apollo.QueryHookOptions<CurrentServiceQuery, CurrentServiceQueryVariables> & ({ variables: CurrentServiceQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentServiceQuery, CurrentServiceQueryVariables>(CurrentServiceDocument, options);
      }
export function useCurrentServiceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentServiceQuery, CurrentServiceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentServiceQuery, CurrentServiceQueryVariables>(CurrentServiceDocument, options);
        }
export function useCurrentServiceSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CurrentServiceQuery, CurrentServiceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CurrentServiceQuery, CurrentServiceQueryVariables>(CurrentServiceDocument, options);
        }
export type CurrentServiceQueryHookResult = ReturnType<typeof useCurrentServiceQuery>;
export type CurrentServiceLazyQueryHookResult = ReturnType<typeof useCurrentServiceLazyQuery>;
export type CurrentServiceSuspenseQueryHookResult = ReturnType<typeof useCurrentServiceSuspenseQuery>;
export type CurrentServiceQueryResult = Apollo.QueryResult<CurrentServiceQuery, CurrentServiceQueryVariables>;
export const ServicesDocument = gql`
    query Services($query: ServiceQueryInput!, $categorySlug: String) {
  services(query: $query, categorySlug: $categorySlug) {
    services {
      id
      name
      slug
      fromPrice
      fromSalePrice
      fromTerm
      excerpt
      coverPath
      videoPath
      categories {
        name
        slug
      }
      averageRating
      visibility
    }
    count
  }
}
    `;

/**
 * __useServicesQuery__
 *
 * To run a query within a React component, call `useServicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useServicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useServicesQuery({
 *   variables: {
 *      query: // value for 'query'
 *      categorySlug: // value for 'categorySlug'
 *   },
 * });
 */
export function useServicesQuery(baseOptions: Apollo.QueryHookOptions<ServicesQuery, ServicesQueryVariables> & ({ variables: ServicesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ServicesQuery, ServicesQueryVariables>(ServicesDocument, options);
      }
export function useServicesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ServicesQuery, ServicesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ServicesQuery, ServicesQueryVariables>(ServicesDocument, options);
        }
export function useServicesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ServicesQuery, ServicesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ServicesQuery, ServicesQueryVariables>(ServicesDocument, options);
        }
export type ServicesQueryHookResult = ReturnType<typeof useServicesQuery>;
export type ServicesLazyQueryHookResult = ReturnType<typeof useServicesLazyQuery>;
export type ServicesSuspenseQueryHookResult = ReturnType<typeof useServicesSuspenseQuery>;
export type ServicesQueryResult = Apollo.QueryResult<ServicesQuery, ServicesQueryVariables>;
export const UserActivityDocument = gql`
    subscription UserActivity($userId: Int!) {
  userActivity(userId: $userId) {
    status
    lastSeen
  }
}
    `;

/**
 * __useUserActivitySubscription__
 *
 * To run a query within a React component, call `useUserActivitySubscription` and pass it any options that fit your needs.
 * When your component renders, `useUserActivitySubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserActivitySubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserActivitySubscription(baseOptions: Apollo.SubscriptionHookOptions<UserActivitySubscription, UserActivitySubscriptionVariables> & ({ variables: UserActivitySubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<UserActivitySubscription, UserActivitySubscriptionVariables>(UserActivityDocument, options);
      }
export type UserActivitySubscriptionHookResult = ReturnType<typeof useUserActivitySubscription>;
export type UserActivitySubscriptionResult = Apollo.SubscriptionResult<UserActivitySubscription>;
export const CheckedMessageDocument = gql`
    subscription CheckedMessage($roomId: Int!, $userId: Int!) {
  checkedMessage(roomId: $roomId, userId: $userId)
}
    `;

/**
 * __useCheckedMessageSubscription__
 *
 * To run a query within a React component, call `useCheckedMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useCheckedMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckedMessageSubscription({
 *   variables: {
 *      roomId: // value for 'roomId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useCheckedMessageSubscription(baseOptions: Apollo.SubscriptionHookOptions<CheckedMessageSubscription, CheckedMessageSubscriptionVariables> & ({ variables: CheckedMessageSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<CheckedMessageSubscription, CheckedMessageSubscriptionVariables>(CheckedMessageDocument, options);
      }
export type CheckedMessageSubscriptionHookResult = ReturnType<typeof useCheckedMessageSubscription>;
export type CheckedMessageSubscriptionResult = Apollo.SubscriptionResult<CheckedMessageSubscription>;
export const NewLastMessageDocument = gql`
    subscription NewLastMessage($roomId: Int!) {
  roomMessages(roomId: $roomId) {
    id
    sender {
      id
    }
    type
    content
    isChecked
    status
    createdAt
  }
}
    `;

/**
 * __useNewLastMessageSubscription__
 *
 * To run a query within a React component, call `useNewLastMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewLastMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewLastMessageSubscription({
 *   variables: {
 *      roomId: // value for 'roomId'
 *   },
 * });
 */
export function useNewLastMessageSubscription(baseOptions: Apollo.SubscriptionHookOptions<NewLastMessageSubscription, NewLastMessageSubscriptionVariables> & ({ variables: NewLastMessageSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewLastMessageSubscription, NewLastMessageSubscriptionVariables>(NewLastMessageDocument, options);
      }
export type NewLastMessageSubscriptionHookResult = ReturnType<typeof useNewLastMessageSubscription>;
export type NewLastMessageSubscriptionResult = Apollo.SubscriptionResult<NewLastMessageSubscription>;
export const NewMessageDocument = gql`
    subscription NewMessage($roomId: Int!) {
  roomMessages(roomId: $roomId) {
    id
    sender {
      id
      profile {
        login
        avatarPath
      }
    }
    type
    content
    isChecked
    status
    updatedAt
    createdAt
  }
}
    `;

/**
 * __useNewMessageSubscription__
 *
 * To run a query within a React component, call `useNewMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewMessageSubscription({
 *   variables: {
 *      roomId: // value for 'roomId'
 *   },
 * });
 */
export function useNewMessageSubscription(baseOptions: Apollo.SubscriptionHookOptions<NewMessageSubscription, NewMessageSubscriptionVariables> & ({ variables: NewMessageSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewMessageSubscription, NewMessageSubscriptionVariables>(NewMessageDocument, options);
      }
export type NewMessageSubscriptionHookResult = ReturnType<typeof useNewMessageSubscription>;
export type NewMessageSubscriptionResult = Apollo.SubscriptionResult<NewMessageSubscription>;
export const UserTypingDocument = gql`
    subscription UserTyping($roomId: Int!, $userId: Int!) {
  userTyping(roomId: $roomId, userId: $userId) {
    isPartnerTyping
  }
}
    `;

/**
 * __useUserTypingSubscription__
 *
 * To run a query within a React component, call `useUserTypingSubscription` and pass it any options that fit your needs.
 * When your component renders, `useUserTypingSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserTypingSubscription({
 *   variables: {
 *      roomId: // value for 'roomId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserTypingSubscription(baseOptions: Apollo.SubscriptionHookOptions<UserTypingSubscription, UserTypingSubscriptionVariables> & ({ variables: UserTypingSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<UserTypingSubscription, UserTypingSubscriptionVariables>(UserTypingDocument, options);
      }
export type UserTypingSubscriptionHookResult = ReturnType<typeof useUserTypingSubscription>;
export type UserTypingSubscriptionResult = Apollo.SubscriptionResult<UserTypingSubscription>;
export const UserNotificationDocument = gql`
    subscription UserNotification($userId: Int!) {
  userNotification(userId: $userId) {
    id
    content
    sender {
      profile {
        login
        avatarPath
      }
    }
    room {
      users {
        profile {
          login
        }
      }
    }
    status
    roomId
    orderId
    type
    createdAt
  }
}
    `;

/**
 * __useUserNotificationSubscription__
 *
 * To run a query within a React component, call `useUserNotificationSubscription` and pass it any options that fit your needs.
 * When your component renders, `useUserNotificationSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserNotificationSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserNotificationSubscription(baseOptions: Apollo.SubscriptionHookOptions<UserNotificationSubscription, UserNotificationSubscriptionVariables> & ({ variables: UserNotificationSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<UserNotificationSubscription, UserNotificationSubscriptionVariables>(UserNotificationDocument, options);
      }
export type UserNotificationSubscriptionHookResult = ReturnType<typeof useUserNotificationSubscription>;
export type UserNotificationSubscriptionResult = Apollo.SubscriptionResult<UserNotificationSubscription>;