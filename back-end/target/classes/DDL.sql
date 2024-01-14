create table if not exists images
(
  id      bigserial not null,
  picture oid,
  constraint images_pkey
    primary key (id)
);

alter table images
  owner to postgres;

create table if not exists small_images
(
  id      bigserial not null,
  picture oid,
  constraint small_images_pkey
    primary key (id)
);

alter table small_images
  owner to postgres;

create table if not exists topics
(
  id   bigserial    not null,
  name varchar(255) not null,
  constraint topics_pkey
    primary key (id)
);

alter table topics
  owner to postgres;

create table if not exists questions
(
  id       bigserial    not null,
  text     varchar(255) not null,
  topic_id bigint       not null,
  constraint questions_pkey
    primary key (id),
  constraint fkdb5p6ukb0v76he4pq87cbymhg
    foreign key (topic_id) references topics
);

alter table questions
  owner to postgres;

create table if not exists answers
(
  id          bigserial    not null,
  is_right    boolean      not null,
  text        varchar(255) not null,
  question_id bigint,
  constraint answers_pkey
    primary key (id),
  constraint fk3erw1a3t0r78st8ty27x6v3g1
    foreign key (question_id) references questions
);

alter table answers
  owner to postgres;

create table if not exists users
(
  id               bigserial    not null,
  active           boolean      not null,
  e_mail           varchar(255) not null,
  first_name       varchar(100) not null,
  last_name        varchar(100) not null,
  password         varchar(255) not null,
  phone            varchar(15),
  profile_image_id bigint,
  small_image_id   bigint,
  constraint users_pkey
    primary key (id),
  constraint uk_ehv2osdo3bfokh566calsfx32
    unique (e_mail),
  constraint uk_du5v5sr43g5bfnji4vb8hg5s3
    unique (phone),
  constraint fke9m3buhrd541cj89320px18t4
    foreign key (profile_image_id) references images,
  constraint fkkc9glr90dqh0c5xr4a5awek7q
    foreign key (small_image_id) references small_images
);

alter table users
  owner to postgres;

create table if not exists quizes
(
  id              bigserial not null,
  end_time        date,
  start_time      date,
  success_percent double precision,
  topic_id        bigint,
  user_id         bigint    not null,
  constraint quizes_pkey
    primary key (id),
  constraint fkqj70xomn6r4vvrvmp5j3fitc7
    foreign key (topic_id) references topics,
  constraint fksx3wbj10h4hi9v5ah9os12p0i
    foreign key (user_id) references users
);

alter table quizes
  owner to postgres;

create table if not exists quiz_questions
(
  id          bigserial not null,
  question_id bigint    not null,
  quiz_id     bigint    not null,
  constraint quiz_questions_pkey
    primary key (id),
  constraint fkev41c723fx659v28pjycox15o
    foreign key (question_id) references questions,
  constraint fkbuts0vh24fi8nv5rbn999rriv
    foreign key (quiz_id) references quizes
);

alter table quiz_questions
  owner to postgres;

create table if not exists quiz_questions_answers
(
  quiz_question_id bigint not null,
  answer_id        bigint not null,
  constraint uk_46hvcpyvdfi5vhw0345u22xr6
    unique (answer_id),
  constraint fk6i7rp2dq0sjmcogfs682527lv
    foreign key (answer_id) references answers,
  constraint fktac8k3pjoadgbgs6lrow1pg65
    foreign key (quiz_question_id) references quiz_questions
);

alter table quiz_questions_answers
  owner to postgres;

create table if not exists user_roles
(
  user_entity_id bigint not null,
  roles          integer,
  constraint fkdr89lbgdaueyjynmkl3xh4yqi
    foreign key (user_entity_id) references users
);

alter table user_roles
  owner to postgres;

