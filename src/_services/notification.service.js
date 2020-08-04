import { Subject } from "rxjs";
import { filter } from "rxjs/operators";

const notificationSubject = new Subject();
const defaultId = "default-alert";

export const notificationService = {
  onAlert,
  success,
  error,
  info,
  warn,
  alert: notify,
  clear,
};

export const notificationType = {
  Success: "Success",
  Error: "Error",
  Info: "Info",
  Warning: "Warning",
};

// enable subscribing to alerts observable
function onAlert(id = defaultId) {
  return notificationSubject
    .asObservable()
    .pipe(filter((x) => x && x.id === id));
}

// convenience methods
function success(message, options) {
  notify({ ...options, type: notificationType.Success, message });
}

function error(message, options) {
  notify({ ...options, type: notificationType.Error, message });
}

function info(message, options) {
  notify({ ...options, type: notificationType.Info, message });
}

function warn(message, options) {
  notify({ ...options, type: notificationType.Warning, message });
}

// core alert method
function notify(notification) {
  notification.id = notification.id || defaultId;
  notification.autoClose =
    notification.autoClose === undefined ? true : notification.autoClose;
  notificationSubject.next(notification);
}

// clear alerts
function clear(id = defaultId) {
  notificationSubject.next({ id });
}
