import EventEmitter from "events";

enum BadgeEvents {
  updateBadge = "updateBadge",
}

export abstract class IBadgeService {
  public readonly count?: number;
  public readonly name?: string;
  public abstract setBadgeCount(count: number): void;
  public abstract getBadgeCount(): number;
}

export interface BadgeServiceProps {
  name?: string;
  count?: number;
}

//由 BadgeService 管理 Badge
export default class BadgeService
  extends EventEmitter
  implements IBadgeService
{
  public readonly name?: string;
  public count: number;
  constructor({ name, count = 0, ...props }: BadgeServiceProps) {
    super(props);
    this.name = name;
    this.count = count;
  }
  setBadgeCount(count: number) {
    this.count = count;
    this.emit(BadgeEvents.updateBadge, count);
  }
  getBadgeCount() {
    return this.count;
  }
}

// 聊天Controller
export class IMController extends BadgeService {
  constructor(props?: any) {
    super({
      name: "IM",
    });
  }
  onMessage(count: number) {
    this.setBadgeCount(count);
  }
}

// 交易Controller， 便于扩展， 未完成授权的数量展示处理
export class PendingController extends BadgeService {
  constructor(props?: any) {
    super({ name: "PendingApprove" });
  }
  txPending(count: number) {
    this.setBadgeCount(count);
  }
}

// 总的控制器
export class AllController {
  public IM: IMController;
  public PendingController: PendingController;
  constructor() {
    this.IM = new IMController();
    this.PendingController = new PendingController();
    this.onBadgeChange();
  }

  onBadgeChange() {
    this.updateBadge();
    this.IM.on(BadgeEvents.updateBadge, this.updateBadge);
    this.PendingController.on(BadgeEvents.updateBadge, this.updateBadge);
  }

  updateBadge() {
    let label = "";
    const count = this.getBadgeCount();

    if (count) {
      label = String(count);
    }

    // chrome.action.setBadgeText({ text: label });
    // chrome.action.setBadgeBackgroundColor({ color: "#037DD6" });
  }

  getBadgeCount() {
    //
    this.IM.count = 1;
    return this.IM.count + this.PendingController.getBadgeCount();
  }
}
