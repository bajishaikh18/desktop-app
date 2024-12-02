import { truncateText } from "@/helpers/common"
import styles from "./Notifications.module.scss";
import { useQueryClient } from "@tanstack/react-query";
import { updateNotification } from "@/apis/notification"
import { Notification } from "@/stores/useNotificationStore";
import { Loader, NotFound } from "../common/Feedbacks";
import { DateTime } from "luxon";
import { useCallback } from "react";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";
import { useRouter } from "nextjs-toploader/app";
import { useTranslations } from "next-intl";


export const Notifications = ({
  notifications,
  isLoading,
  error,
}: {
  notifications?: Notification[];
  isLoading: boolean;
  error: any;
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const notificationsNew = notifications?.filter((notif) => !notif.dismissed);
  const notificationsPrev = notifications?.filter((notif) => notif.dismissed);

  const t = useTranslations("Notification");  

  const markAsRead = useCallback(
    async (id: string) => {
      try {
        await updateNotification(id, { dismissed: true });
        await queryClient.invalidateQueries({
          predicate: (query) => {
            return query.queryKey.includes('user-notifications');
          },
          refetchType:'all'
        })
       
      } catch {
       
      }
    },
    [notificationsNew]
  );


  // const markAllAsRead = useCallback(
  //   async () => {
  //     try {
  //       const ids = notificationsNew?.map(x=>x._id);
  //       await updateNotification(ids, { dismissed: true });
  //     } catch {
  //       toast.error("Something went wrong while marking notification status");
  //     }
  //   },
  //   [notificationsNew]
  // );

  const openNotification = useCallback(
    async (notification: Notification) => {
      try {
        await markAsRead(notification._id);
      } catch (e) {}
      if (notification.data) {
        router.push(notification.data);
      }
    },
    [markAsRead]
  );

  return (
    <div className={styles.notificationPanel}>
      <div className={styles.notificationHeader}>
        <h3>{t('notifications')}</h3>
        <a className={styles.markAllRead} href="#">
          {t('mark_read')}
        </a>
      </div>
      <div className={styles.notificationContentContainer}>
        {isLoading ? (
          <Loader text={t("fetching_notifications")} />
        ) : error ? (
          <NotFound text={t("error_fetching")} />
        ) : notifications && notifications?.length > 0 ? (
          <>
            <div className={styles.notificationSection}>
              {
                <div className={styles.notificationCreateHeader}>
                  {notificationsNew && notificationsNew?.length > 0 && (
                    <h4>{t('new')} ({notificationsNew.length})</h4>
                  )}
                  <Link href="/notifications">
                   
                  </Link>
                </div>
              }
              {notificationsNew?.map((notification) => {
                return (
                  <div
                    className={styles.notificationItem}
                    onClick={() => openNotification(notification)}
                  >
                    <div className={styles.notificationContent}>
                      <div>
                        <h5>{notification.title}</h5>
                        <p className={styles.notificationDescription}>
                          {truncateText(notification.description, 30)}
                        </p>
                      </div>
                      <time className={styles.notificationTime}>
                        {DateTime.fromISO(notification.createdAt).toRelative()}
                      </time>
                    </div>
                  </div>
                );
              })}
            </div>
            <div
              className={`${styles.notificationSection} ${styles.dismissed}`}
            >
              {notificationsPrev && notificationsPrev.length > 0 && (
                <div className={styles.notificationCreateHeader}>
                  {" "}
                  <h4>{t('previous')} ({notificationsPrev.length})</h4>
                </div>
              )}
              {notificationsPrev?.map((notification) => {
                return (
                  <div
                    className={styles.notificationItem}
                    onClick={() => openNotification(notification)}
                  >
                    <div className={styles.notificationContent}>
                      <div>
                        <h5>{notification.title}</h5>
                        <p className={styles.notificationDescription}>
                          {truncateText(notification.description, 30)}
                        </p>
                      </div>
                      <time className={styles.notificationTime}>2 mins</time>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ):<NotFound text={t("no_notifications")} /> }
      </div>
    </div>
  );
};
