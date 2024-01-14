Hibernate: drop sequence if exists hibernate_sequence
Hibernate: create sequence hibernate_sequence start 1 increment 1
Hibernate: create table answers (id  bigserial not null, is_right boolean, text varchar(255) not null, question_id int8, primary key (id))
Hibernate: create table confirmation_token (id int8 not null, text varchar(255), user_id int8 not null, primary key (id))
Hibernate: create table images (id  bigserial not null, picture oid, primary key (id))
Hibernate: create table questions (id  bigserial not null, text varchar(255) not null, topic_id int8 not null, primary key (id))
Hibernate: create table quiz_questions (id  bigserial not null, question_id int8 not null, quiz_id int8 not null, primary key (id))
Hibernate: create table quiz_questions_answers (quiz_question_id int8 not null, answer_id int8 not null)
Hibernate: create table quizes (id  bigserial not null, expected_duration int4, end_time timestamp, start_time timestamp, success_percent float8, topic_id int8, user_id int8 not null, primary key (id))
Hibernate: create table small_images (id  bigserial not null, picture oid, primary key (id))
Hibernate: create table topics (id  bigserial not null, title varchar(255) not null, primary key (id))
Hibernate: create table upcoming_quiz_entity (id  bigserial not null, deadline timestamp, expected_duration int4, topic_id int8, user_id int8 not null, primary key (id))
Hibernate: create table user_role (user_id int8 not null, roles varchar(255))
Hibernate: create table users (id  bigserial not null, active boolean not null, e_mail varchar(255) not null, first_name varchar(100) not null, last_name varchar(100) not null, password varchar(255) not null, phone varchar(15), profile_image_id int8, small_image_id int8, primary key (id))
Hibernate: alter table quiz_questions_answers add constraint UK_46hvcpyvdfi5vhw0345u22xr6 unique (answer_id)
Hibernate: alter table users add constraint UK_ehv2osdo3bfokh566calsfx32 unique (e_mail)
Hibernate: alter table users add constraint UK_du5v5sr43g5bfnji4vb8hg5s3 unique (phone)
Hibernate: alter table answers add constraint FK3erw1a3t0r78st8ty27x6v3g1 foreign key (question_id) references questions
Hibernate: alter table confirmation_token add constraint FKah4p1rycwibwm6s9bsyeckq51 foreign key (user_id) references users
Hibernate: alter table questions add constraint FKdb5p6ukb0v76he4pq87cbymhg foreign key (topic_id) references topics
Hibernate: alter table quiz_questions add constraint FKev41c723fx659v28pjycox15o foreign key (question_id) references questions
Hibernate: alter table quiz_questions add constraint FKbuts0vh24fi8nv5rbn999rriv foreign key (quiz_id) references quizes
Hibernate: alter table quiz_questions_answers add constraint FK6i7rp2dq0sjmcogfs682527lv foreign key (answer_id) references answers
Hibernate: alter table quiz_questions_answers add constraint FKtac8k3pjoadgbgs6lrow1pg65 foreign key (quiz_question_id) references quiz_questions
Hibernate: alter table quizes add constraint FKqj70xomn6r4vvrvmp5j3fitc7 foreign key (topic_id) references topics
Hibernate: alter table quizes add constraint FKsx3wbj10h4hi9v5ah9os12p0i foreign key (user_id) references users
Hibernate: alter table upcoming_quiz_entity add constraint FKnn0nsok7bhjksm8l8l50mjnt1 foreign key (topic_id) references topics
Hibernate: alter table upcoming_quiz_entity add constraint FKmcu7qi1jyhdin762d5mr4myr7 foreign key (user_id) references users
Hibernate: alter table user_role add constraint FKj345gk1bovqvfame88rcx7yyx foreign key (user_id) references users
Hibernate: alter table users add constraint FKe9m3buhrd541cj89320px18t4 foreign key (profile_image_id) references images
Hibernate: alter table users add constraint FKkc9glr90dqh0c5xr4a5awek7q foreign key (small_image_id) references small_images
