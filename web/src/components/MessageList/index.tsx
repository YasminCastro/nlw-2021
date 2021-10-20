import styles from "./styles.module.scss";

import LogoImg from "../../assets/logo.svg";

export function MessageList() {
  return (
    <div className={styles.messageListWrapper}>
      <img src={LogoImg} alt="Logo DoWhile 2021" />

      <ul className={styles.messageList}>
        <li className={styles.message}>
          <p className={styles.messageContent}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Consectetur reprehenderit autem quo? Molestias pariatur eligendi,
            dolorem nulla aliquam sequi, aperiam modi voluptatem, at ipsum
            facilis. Aliquid, commodi numquam! Quae, accusamus.
          </p>
          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img
                src="https://github.com/yasmincastro.png"
                alt="Yasmin Castro"
              />
            </div>
            <span>Yas Castro</span>
          </div>
        </li>

        <li className={styles.message}>
          <p className={styles.messageContent}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Consectetur reprehenderit autem quo? Molestias pariatur eligendi,
            dolorem nulla aliquam sequi, aperiam modi voluptatem, at ipsum
            facilis. Aliquid, commodi numquam! Quae, accusamus.
          </p>
          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img
                src="https://github.com/yasmincastro.png"
                alt="Yasmin Castro"
              />
            </div>
            <span>Yas Castro</span>
          </div>
        </li>

        <li className={styles.message}>
          <p className={styles.messageContent}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Consectetur reprehenderit autem quo? Molestias pariatur eligendi,
            dolorem nulla aliquam sequi, aperiam modi voluptatem, at ipsum
            facilis. Aliquid, commodi numquam! Quae, accusamus.
          </p>
          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img
                src="https://github.com/yasmincastro.png"
                alt="Yasmin Castro"
              />
            </div>
            <span>Yas Castro</span>
          </div>
        </li>
      </ul>
    </div>
  );
}
