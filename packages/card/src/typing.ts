import type { TabPaneProps, TabsProps } from "naive-ui";
import type { CSSProperties, VNode,Ref } from "vue";
export type BreakPoint = "xxl" | "xl" | "lg" | "md" | "sm" | "xs";
export type Gutter = number | Partial<Record<BreakPoint, number>>;
export type ColSpanType = number | string;

type CollapsibleType = "icon" | "header" | boolean;
type CardPropsBase = {
  /* 标题样式 */
  headStyle?: CSSProperties;
  /* 内容样式 */
  bodyStyle?: CSSProperties;
  /* 页头是否有分割线 */
  headerBordered?: boolean;
  /* 卡片标题 */
  title?: VNode;
  /* 副标题 */
  subTitle?: VNode;
  /* 标题说明 */
  tooltip?: string | VNode | (() => VNode);
  /* 右上角自定义区域 */
  extra?: VNode;
  /* 布局,center代表垂直居中 */
  layout?: "default" | "center";
  /* 卡片类型 */
  type?: "default" | "inner";
  /* 指定Flex方向,仅在嵌套子卡片时有效 */
  direaction?: "column" | "row";
  /* 是否自动换行,仅在嵌套子卡片时有效 */
  wrap?: boolean;
  /* 尺寸 */
  size?: "default" | "small";
  /* 加载中 */
  loading?: boolean | VNode;
  /* 栅格布局宽度,24栅格,支持指定宽度或百分比,需要支持响应式 colSpan={{xs:12,sm:6}} */
  colSpan?: ColSpanType | Partial<Record<BreakPoint, ColSpanType>>;
  /* 栅格样式 */
  colStyle?: CSSProperties;
  /* 栅格间距 */
  colGap?: Gutter | Gutter[];
  /* 操作按钮 */
  actions?: VNode[] | VNode;
  /* 拆分卡片方式 */
  split?: "horizontal" | "vertical";
  /* 是否有边框 */
  bordered?: boolean;
  /**
   * 鼠标移过时可浮起
   * @default false
   */
  hoverable?: boolean;
  /* 幽灵模式,即是否取消卡片内容区域的padding和背景颜色 */
  ghost?: boolean;
  /* 是否可折叠 */
  collapsible?: CollapsibleType;
  /* 受控collapsed属性 */
  collapsed?: boolean;
  /* 折叠按钮自定义节点 */
  collapsibleIconRender?: ({ collapsed }: { collapsed: boolean }) => VNode;
  /* 配置默认是否折叠 */
  defaultCollapsed?: boolean;
  /* 收起卡片的事件 */
  onCollapse?: (collapsed: boolean) => void;
  /* 前缀 */
  prefixCls?: string;
  /** ProCard 的 ref */
  ref?: Ref<HTMLDivElement | undefined>;
  /** 是否展示选中样式 */
  checked?: boolean;
  /** 选中改变 */
//   onChecked?: (e: MouseEvent<HTMLDivElement, MouseEvent>) => void;
  /** card的阴影 */
  boxShadow?: boolean;
};
