import { GalleryEntryModel } from './models/GalleryEntryModel';
import { UserModel } from './models/UserModel';
import { PetPlantModel } from './models/PetPlantModel';
import { JobModel } from './models/JobModel';
import { EventModel } from './models/EventModel';
import { ConversationModel } from './models/ConversationModel';
import { GalleryModel } from './models/GalleryModel';
import { RatingModel } from './models/RatingModel';
import { PetPlantDescriptorModel } from './models/PetPlantDescriptorModel';
import { JobApplicantModel } from './models/JobApplicantModel';
import { EventParticipantModel } from './models/EventParticipantModel';
import { EventCommentModel } from './models/EventCommentModel';
import { MessageModel } from './models/MessageModel';
import { JobPetsPlantsModel } from './models/JobPetsPlantsModel';

const { Sequelize } = require('sequelize');
require('dotenv').config();

const { DB_DATABASE, DB_DIALECT, DB_HOST, DB_PASSWORD, DB_USERNAME } =
  process.env;
const db = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  logging: false,
});

const User = db.define('user', UserModel);
const PetPlant = db.define('pet_plant', PetPlantModel);
const Job = db.define('job', JobModel);
const Events = db.define('event', EventModel);
const Conversation = db.define('conversation', ConversationModel);
const Gallery = db.define('gallery', GalleryModel);
const Rating = db.define('rating', RatingModel);
const PetPlantDescriptor = db.define(
  'pet_plant_descriptor',
  PetPlantDescriptorModel
);
const JobApplicant = db.define('job_applicant', JobApplicantModel);
const EventParticipant = db.define('event_participant', EventParticipantModel);
const EventComment = db.define('event_comment', EventCommentModel);
const Messages = db.define('message', MessageModel);
const GalleryEntry = db.define('gallery_entry', GalleryEntryModel);
const JobPetsPlants = db.define('job_pets_plants', JobPetsPlantsModel);

/************************************************/

User.hasMany(PetPlant, {
  foreignKey: 'owner_id',
});

Job.belongsTo(User, {
  foreignKey: 'employer_id',
});

Job.belongsTo(User, {
  foreignKey: 'sitter_id',
  as: 'sitter',
});

Job.hasMany(JobApplicant, {
  foreignKey: 'job_id',
});

JobApplicant.belongsTo(Job, {
  foreignKey: 'job_id',
});

JobApplicant.belongsTo(User, {
  foreignKey: 'user_id',
});

Job.hasMany(JobPetsPlants, {
  foreignKey: 'job_id',
});

JobPetsPlants.belongsTo(PetPlant, {
  foreignKey: 'pet_plant_id',
});

User.hasMany(Rating, {
  foreignKey: 'user_id',
});

PetPlant.hasMany(Rating, {
  foreignKey: 'petplant_id',
});

Rating.belongsTo(User, {
  foreignKey: 'submitter_id',
  as: 'submitter',
});

Conversation.belongsTo(User, {
  foreignKey: 'participant1_id',
});

Conversation.belongsTo(User, {
  foreignKey: 'participant2_id',
});

Messages.belongsTo(Conversation, {
  foreignKey: 'conversation_id',
});

Messages.belongsTo(User, {
  foreignKey: 'sender_id',
});

Messages.belongsTo(User, {
  foreignKey: 'receiver_id',
});

Events.belongsTo(User, {
  foreignKey: 'host',
});

EventParticipant.belongsTo(User, {
  foreignKey: 'user_id',
});

Events.hasMany(EventParticipant, {
  foreignKey: 'event_id',
});

EventComment.belongsTo(User, {
  foreignKey: 'user_id',
});

Events.hasMany(EventComment, {
  foreignKey: 'event_id',
});

PetPlantDescriptor.belongsTo(PetPlant, {
  foreignKey: 'pet_plant_id',
});

User.hasOne(Gallery, {
  foreignKey: 'id',
});

// Gallery.hasOne(User, {
//   foreignKey: 'user_id',
// });

User.belongsTo(Gallery, {
  foreignKey: 'id',
});

Gallery.hasMany(GalleryEntry, {
  foreignKey: 'gallery_id',
});

/************************************************/

db.sync(
  process.env.CLIENT_URL === 'http://localhost'
    ? { force: true }
    : { force: true }
) //insert {alter: true}(alters tables if necessary) or {force: true}(drops all tables and recreates them every save) if you need to change the db structure
  .then(() => {
    if (true) {
      User.bulkCreate([
        {
          name: 'Iben Oneal',
          // image: '',
          location: '',
          sitter_rating: 10,
          total_sitter_ratings: 24,
          bio: '',
          average_rating: 5,
          total_ratings: 95,
        },
        {
          name: 'Braeden Ford',
          image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVKs06QLIdwr5m5iIjxvDitADflWB1gjJCWg&usqp=CAU',
          location: '1500 Sugar Bowl Dr, New Orleans, LA 70112',
          sitter_rating: 10,
          total_sitter_ratings: 24,
          bio: 'Other specified injury of unspecified blood vessel at ankle and foot level, right leg',
          rating: 6,
          total_ratings: 95,
        },
        {
          name: 'velouriagreen',
          image: 'https://ca.slack-edge.com/T02P3HQD6-U01BYVDCZJ9-b9b06931e593-512',
          location: '6838 Louisville St, New Orleans, LA 70124',
          sitter_rating: 8,
          total_sitter_ratings: 93,
          bio: 'Exiled Vixen of California',
          rating: 7,
          total_ratings: 83,
        },
        {
          name: 'Eric Gjertsen',
          image: 'https://yugiohblog.konami.com/wp-content/uploads/2013/03/Eric-Gjertsen-480x360.jpg',
          location: '3703 Derbigny StMetairie, LA 70001',
          sitter_rating: 8,
          total_sitter_ratings: 88,
          bio: 'Owner of one dog and two silly rabbits! Will treat your pets and plants as if they were my own, and hope you\'ll do the same!',
          rating: 1,
          total_ratings: 18,
        },
        {
          name: 'Caity',
          location: '4609 Banks St, New Orleans, LA 70119',
          sitter_rating: 4,
          total_sitter_ratings: 38,
          bio: 'Nondisplaced bicondylar fracture of left tibia',
          rating: 7,
          total_ratings: 93,
        },
        {
          name: 'Raymond Jeong',
          location: '1213 Gaudet Dr, Marrero, LA 70072',
          sitter_rating: 3,
          total_sitter_ratings: 86,
          bio: 'Major laceration of right vertebral artery, initial encounter',
          rating: 4,
          total_ratings: 70,
        },
        {
          name: 'Royce Reed',
          image: 'https://i.ibb.co/KzPh6jF/276252615-10106161668080074-4711674266876397466-n-1.jpg',
          location: '1213 Elysian Fields Ave, New Orleans, LA 70117',
          sitter_rating: null,
          total_sitter_ratings: 86,
          bio: 'Here to find responsible pet sitters for my animals.',
          rating: 4,
          total_ratings: 70,
        },
      ]).then(() => {
        PetPlant.bulkCreate([
          {
            owner_id: 1,
            name: 'Santi',
            image:
              'https://64.media.tumblr.com/ac3f2698510ef384fdb04620750b228e/25d400665ce53341-ef/s500x750/58c0307cb0fed6a450b04ec559e8a67d99984fbf.jpg',
            breed: 'snorkie',
            species: 'Dog',
            tags: [],
            rating: 9,
            total_ratings: 33,
            is_plant: false,
            bio: 'I\'m very shy, but if you feed me then I instantly become your best friend',
          },
          {
            owner_id: 2,
            name: 'Nova',
            image:
              'https://res.cloudinary.com/bford002/image/upload/v1654528525/8B69B1F7-0B39-4F3F-BF45-D0EB0FA186B2_qjl237.jpg',
            breed: 'Skink, blue-tongued',
            species: 'Dog',
            tags: [],
            rating: 8,
            total_ratings: 96,
            is_plant: false,
            bio: 'I am the world\'s worst demon child. I like sleeping in toilets, so be sure to leave it open for me. And no, the cat did not write this',
          },
          {
            owner_id: 3,
            name: 'Audrey II',
            image:
              'https://dafb3cv85j5xj.cloudfront.net/blog/wp-content/uploads/2016/09/audreyII_feat.jpg',
            breed: 'Venus Fly Trap Mix',
            species: 'Butterwort',
            tags: [],
            rating: 5,
            total_ratings: 71,
            is_plant: true,
            bio: 'Forget the water! I feed on human blood.',
          },
          {
            owner_id: 4,
            name: 'Cheese',
            image:
              'https://scontent-dfw5-2.xx.fbcdn.net/v/t1.6435-9/51773029_1956029971176361_3676321984800620544_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=973b4a&_nc_ohc=LiqK_hVeOEMAX-gFp-w&_nc_ht=scontent-dfw5-2.xx&oh=00_AT-_0RyeKCRWR78qn3xTKgps1z53kFgY1LFxtMVnR8h4eQ&oe=630857C0',
            breed: 'Rabbit',
            species: 'Rodent',
            tags: ['Speedy', 'Sly'],
            rating: 4,
            total_ratings: 92,
            is_plant: true,
            gender: 'Male',
            bio: 'I\'m an escape artist. Don\'t turn your back on me for a second.',
          },
          {
            owner_id: 5,
            name: 'Borg',
            image:
              'https://img.ltwebstatic.com/images3_pi/2021/09/15/163167654356847e12d337794dac92991b367b6323_thumbnail_600x.webp',
            breed: 'Long-tailed feline',
            species: 'Cat',
            tags: [],
            rating: 9,
            total_ratings: 60,
            is_plant: false,
            bio: 'My friends say I\'m the coolest cat on the block.',
          },
          {
            owner_id: 4,
            name: 'Smoke',
            image:
              'https://scontent-dfw5-2.xx.fbcdn.net/v/t1.6435-9/52594294_1980026508776707_9193062512776445952_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=973b4a&_nc_ohc=BgxfWGCGM68AX-Qk8tX&_nc_ht=scontent-dfw5-2.xx&oh=00_AT8oeFm016qWlhs0NEOvyVnpq83oRMvsUHd2SJoNPe0MiQ&oe=63063441',
            breed: 'Rabbit',
            age: 2,
            gender: 'Female',
            species: 'Rodent',
            tags: ['Speed', 'Cute'],
            rating: 4,
            total_ratings: 33,
            is_plant: false,
            bio: 'I\'m a super laid back bunny who loves attention.',
          },
          {
            owner_id: 7,
            name: 'Benito',
            image:
              'https://i.pinimg.com/564x/f9/cb/ac/f9cbac7622150fa28306a16dde13bb25.jpg',
            breed: 'Long-tailed feline',
            species: 'Cat',
            tags: [],
            rating: 9,
            total_ratings: 60,
            is_plant: false,
            bio: 'I used to belong to the streets. Now I sleep at my human\'s feets!',
          },
          {
            owner_id: 4,
            name: 'Rex',
            image:
              'https://ae01.alicdn.com/kf/U1591012120494f93a206d6649b837472g.jpg_240x240.jpg_.webp',
            breed: 'Dalmatian',
            age: 2,
            gender: 'Male',
            species: 'Dog',
            tags: ['Spotted', 'Silly', 'Speed', 'Cute'],
            rating: 4,
            total_ratings: 33,
            is_plant: false,
            bio: 'Ain\'t I cute?!',
          },
          {
            owner_id: 6,
            name: 'Tiger',
            image:
              'https://i0.wp.com/katzenworld.co.uk/wp-content/uploads/2019/06/funny-cat.jpeg?resize=1320%2C1320&ssl=1',
            breed: 'Tiger',
            age: 2,
            gender: 'Female',
            species: 'Cat',
            tags: ['Silly', 'Cute'],
            rating: 4,
            total_ratings: 33,
            is_plant: false,
            bio: 'Truly the most photogenic cat ever!',
          },
          {
            owner_id: 7,
            name: 'Russell',
            image: 'https://i.ibb.co/Wxg1Pxv/russell.jpg',
            breed: 'Chihuahua Mix',
            species: 'Dog',
            rating: 5,
            total_ratings: 71,
            is_plant: false,
            bio: 'I\'m shy at first but I\'ll soon become your best friend.',
          },
          {
            owner_id: 7,
            name: 'Callie',
            image: 'https://i.ibb.co/vw7j17p/callie.jpg',
            breed: 'American Shorthair',
            species: 'Cat',
            rating: 5,
            total_ratings: 71,
            is_plant: false,
            bio: 'Wanna be friends?',
          },
        ]).then(() => {
          Rating.bulkCreate([
            {
              user_id: 7,
              value: 5,
              text: 'Excellent sitter, I have hired him for all my sitting needs and he comes prepared and ready to go!',
              submitter_id: 3,
            },
            {
              petplant_id: 10,
              value: 5,
              submitter_id: 4,
            },
            {
              user_id: 7,
              value: 4,
              text: 'My pet parrot loved him! He just fed him to much millet.',
              submitter_id: 5,
            },
            {
              user_id: 7,
              value: 5,
              text: 'My dog loves him so much!',
              submitter_id: 4,
            },
            {
              user_id: 2,
              value: 4,
              text: 'An expert in teaching parrots how to curse',
              submitter_id: 4,
            },
            {
              petplant_id: 11,
              value: 4,
              text: 'I love this dog',
              submitter_id: 3,
            },
            {
              petplant_id: 10,
              value: 5,
              text: 'Best Pupper',
              submitter_id: 2,
            },
          ]).then(() => {
            Job.bulkCreate([
              {
                location: '1213 Elysian Fields Ave, New Orleans, LA 70117',
                pet_plant: [2],
                employer_id: 2,
                description: 'Come watch my child!',
                sitter_id: 7,
                startDate: new Date('August 8, 2022 01:15:00'),
                endDate: new Date('August 10, 2022 01:15:00'),
                isCompleted: false,
              },
              {
                location: '6838 Louisville St, New Orleans, LA 70124',
                pet_plant: [10],
                employer_id: 7,
                description: 'Come watch this little devil',
                sitter_id: null,
                startDate: new Date('August 7, 2022 01:15:00'),
                endDate: new Date('August 9, 2022 01:15:00'),
                isCompleted: true,
              },
              {
                location: '2705 A P Tureaud Ave, New Orleans, LA 70119',
                pet_plant: [11],
                employer_id: 7,
                sitter_id: 3,
                description:
                  'Need someone to watch my animals while I leave town for two days',
                startDate: new Date('July 28, 2022 01:15:00'),
                endDate: new Date('July 29, 2022 01:15:00'),
                isCompleted: false,
              },
              {
                location: '4609 Banks St, New Orleans, LA 70119',
                pet_plant: [5],
                employer_id: 5,
                description:
                  'Leaving town for five days and need someone to sit my babies',
                sitter_id: 7,
                startDate: new Date('July 29, 2022 01:15:00'),
                endDate: new Date('July 30, 2022 01:15:00'),
                isCompleted: true,
              },
              {
                location: '1213 Gaudet Dr, Marrero, LA 70072',
                description:
                  'Looking for an energetic person to care for my rambunctious bunch',
                pet_plant: [4, 8],
                employer_id: 4,
                sitter_id: 7,
                startDate: new Date('July 10, 2022 01:15:00'),
                endDate: new Date('July 11, 2022 01:15:00'),
                isCompleted: false,
              },
              {
                location: '1600 Frankel Ave, Metairie, LA 70003',
                pet_plant: [7],
                employer_id: 7,
                description:
                  'In desperate need for someone to water my ficus for a day',
                sitter_id: null,
                startDate: new Date('August 1, 2022 01:15:00'),
                endDate: new Date('August 2, 2022 01:15:00'),
                isCompleted: false,
              },
              {
                location: '1605 Frankel Ave, Metairie, LA 70003',
                pet_plant: [1],
                employer_id: 1,
                description:
                  'Could use an extra hand here while I\'m out of town for two nights',
                sitter_id: null,
                startDate: new Date('July 31, 2022 01:15:00'),
                endDate: new Date('August 1, 2022 01:15:00'),
                isCompleted: false,
              },
              {
                location: '1610 Frankel Ave, Metairie, LA 70003',
                pet_plant: [5],
                employer_id: 5,
                description:
                  'Interested in hanging with gerbils? Come feed mine!',
                sitter_id: null,
                startDate: new Date('August 29, 2022 01:15:00'),
                endDate: new Date('August 30, 2022 01:15:00'),
                isCompleted: false,
              },
              {
                location: '1221 S Clearview',
                pet_plant: [1],
                employer_id: 1,
                description:
                  'College student swamped with school work and in need of someone to feed/walk dog',
                sitter_id: null,
                startDate: new Date('August 30, 2022 01:15:00'),
                endDate: new Date('September 1, 2022 01:15:00'),
                isCompleted: false,
              },
              {
                location: '3707 Derbigny St',
                pet_plant: [6, 4],
                employer_id: 4,
                description:
                  'S.O.S All I need is for someone to help me keep my partner\'s plants alive while they\'re out of town!',
                sitter_id: null,
                startDate: new Date('August 15, 2022 01:15:00'),
                endDate: new Date('August 20, 2022 01:15:00'),
                isCompleted: false,
              },
              {
                location: '4245 Connecticut Ave, Kenner, LA 70065',
                pet_plant: [8, 6],
                employer_id: 4,
                description:
                  'Who can walk cats? If this is you, then please feel free to help me walk mine',
                sitter_id: null,
                startDate: new Date('August 14, 2022 01:15:00'),
                endDate: new Date('August 15, 2022 01:15:00'),
                isCompleted: false,
              },
              {
                location: 'Superdome New Orleans',
                pet_plant: [8, 6],
                employer_id: 4,
                description:
                  'I could use some help feeding my goddamn tortoise. Please wear closed-toe shoes or he\'ll eat your toes!',
                sitter_id: null,
                startDate: new Date('August 19, 2022 01:15:00'),
                endDate: new Date('August 23, 2022 01:15:00'),
                isCompleted: false,
              },
              {
                location: '1213 Gaudet Dr, Marrero, LA 70072',
                pet_plant: [9],
                employer_id: 6,
                description:
                  'Hello, my name is Raymond. Please come watch my babies while I code!!',
                sitter_id: null,
                startDate: new Date('July 29, 2022 01:15:00'),
                endDate: new Date('August 2, 2022 01:15:00'),
                isCompleted: false,
              },
            ]).then(() => {
              Events.bulkCreate([
                {
                  name: 'Dog Park Meetup',
                  host: 1,
                  location: '10 Magnolia Dr, New Orleans, LA 70124',
                  description:
                    'Maybe you like to hike or camp with your dog, but are not sure of which are pet safe and dog-friendly trails and sites. Or, maybe you would just like to meet other doggy parents and give yourself and your dog a chance to simply socialize.',
                  startDate: new Date('August 4, 2022 13:15:00'),
                  startTime: '3:20 PM',
                },
                {
                  name: 'Annual Animal Rescue Drive',
                  host: 2,
                  location: '8639 Plum St New Orleans, Louisiana, 70118',
                  description:
                    'A gathering for pet-less humans to meet and become rescued by their furrever friends',
                  startDate: new Date('July 29, 2022 01:15:00'),
                  startTime: '4:45 PM',
                },
                {
                  name: 'Barkus Parade',
                  host: 3,
                  location: '6821 Mayo Blvd New Orleans, Louisiana, 70126',
                  description:
                    'The Mystic Krewe of Barkus is a New Orleans Mardi Gras parade where participants are dogs costumed',
                  startDate: new Date('July 27, 2022 01:15:00'),
                  startTime: '6:00 PM',
                },
                {
                  name: 'Post Disaster Food Drive for our Reptile Friends',
                  host: 4,
                  location: '862 S Clearview Pky New Orleans, Louisiana, 70123',
                  description:
                    'Reptiles are our friends, not overlords! Please join us in destigmatizing the taboo surrounding our cold-blooded homies. Free mice available upon request',
                  startDate: new Date('July 28, 2022 01:15:00'),
                  startTime: '12:20 PM',
                },
                {
                  name: 'Demanding Plant Workshop',
                  host: 5,
                  location: '8912 Bunker Hill Rd New Orleans, Louisiana, 70127',
                  description:
                    'A gathering for green-thumbed humans to impart their plant-care wisdom for those high-maintentance plants you just had to buy, Linda',
                  startDate: new Date('July 30, 2022 01:15:00'),
                  startTime: '4:30 PM',
                },
              ])
                .then(() => {
                  EventComment.bulkCreate([
                    {
                      // id: 1,
                      event_id: 1,
                      comment: 'Can\'t wait!',
                      user_id: 1,
                    },
                    {
                      // id: 2,
                      event_id: 1,
                      comment: 'This looks fun, but will there be bacon?',
                      user_id: 2,
                    },
                    {
                      // id: 3,
                      event_id: 1,
                      comment: 'I think we should avoid the bacon, dude.',
                      user_id: 3,
                    },
                    {
                      // id: 4,
                      event_id: 1,
                      comment:
                        'I mean, I don\'t think bacon is a terrible idea.',
                      user_id: 4,
                    },
                    {
                      // id: 5,
                      event_id: 1,
                      comment: 'I\'m bringing hummus!',
                      user_id: 5,
                    },
                    {
                      // id: 6,
                      event_id: 1,
                      comment: 'Oh great! Who invited the vegetarian?',
                      user_id: 1,
                    },
                  ]);
                })
                .then(() => {
                  EventParticipant.bulkCreate([
                    {
                      // id: 1,
                      event_id: 1,
                      user_id: 1,
                    },
                    {
                      // id: 2,
                      event_id: 2,
                      user_id: 2,
                    },
                    {
                      // id: 3,
                      event_id: 3,
                      user_id: 3,
                    },
                    {
                      // id: 4,
                      event_id: 4,
                      user_id: 4,
                    },
                  ]);
                })
                .then(() => {
                  JobApplicant.bulkCreate([
                    {
                      user_id: 1,
                      job_id: 1,
                      status: 'accepted',
                    },
                    {
                      user_id: 7,
                      job_id: 1,
                      status: 'rejected',
                    },
                    {
                      user_id: 7,
                      job_id: 3,
                      status: 'accepted',
                    },
                    {
                      user_id: 7,
                      job_id: 4,
                      status: 'accepted',
                    },
                    {
                      user_id: 7,
                      job_id: 5,
                      status: 'accepted',
                    },
                    {
                      user_id: 7,
                      job_id: 10,
                      status: 'pending',
                    },
                    {
                      user_id: 1,
                      job_id: 10,
                      status: 'pending',
                    },
                    {
                      user_id: 2,
                      job_id: 10,
                      status: 'pending',
                    },
                    {
                      user_id: 1,
                      job_id: 11,
                      status: 'pending',
                    },
                    {
                      user_id: 2,
                      job_id: 11,
                      status: 'pending',
                    },
                    {
                      user_id: 3,
                      job_id: 11,
                      status: 'pending',
                    },
                    {
                      user_id: 5,
                      job_id: 11,
                      status: 'pending',
                    },
                    {
                      user_id: 6,
                      job_id: 11,
                      status: 'pending',
                    },
                    {
                      user_id: 7,
                      job_id: 11,
                      status: 'pending',
                    },
                  ]);
                })
                .then(() => {
                  JobPetsPlants.bulkCreate([
                    {
                      job_id: 1,
                      pet_plant_id: 2,
                    },
                    {
                      job_id: 2,
                      pet_plant_id: 10,
                    },
                    {
                      job_id: 3,
                      pet_plant_id: 11,
                    },
                    {
                      job_id: 4,
                      pet_plant_id: 5,
                    },
                    {
                      job_id: 5,
                      pet_plant_id: 4,
                    },
                    {
                      job_id: 5,
                      pet_plant_id: 8,
                    },
                    {
                      job_id: 6,
                      pet_plant_id: 7,
                    },
                    {
                      job_id: 7,
                      pet_plant_id: 1,
                    },
                    {
                      job_id: 8,
                      pet_plant_id: 5,
                    },
                    {
                      job_id: 9,
                      pet_plant_id: 1,
                    },
                    {
                      job_id: 10,
                      pet_plant_id: 6,
                    },
                    {
                      job_id: 10,
                      pet_plant_id: 4,
                    },
                    {
                      job_id: 11,
                      pet_plant_id: 6,
                    },
                    {
                      job_id: 11,
                      pet_plant_id: 8,
                    },
                    {
                      job_id: 12,
                      pet_plant_id: 6,
                    },
                    {
                      job_id: 12,
                      pet_plant_id: 8,
                    },
                    {
                      job_id: 13,
                      pet_plant_id: 9,
                    },
                  ]);
                })
                .catch((err: Error) => console.log(err));
            });
          });
        });
      });
    }
  })

  .then(() =>
    console.log(
      process.env.CLIENT_URL === 'http://localhost'
        ? '🐘 Models synced and 🌱 seeded!'
        : '🐘 Models synced!'
    )
  )
  .catch((err: string) => console.error(err));

export {
  db,
  User,
  Conversation,
  Gallery,
  GalleryEntry,
  Messages,
  EventComment,
  EventParticipant,
  JobApplicant,
  PetPlantDescriptor,
  Rating,
  Events,
  Job,
  PetPlant,
  JobPetsPlants,
};
