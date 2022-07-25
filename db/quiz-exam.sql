-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 25, 2022 at 12:02 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.4.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quiz-exam`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` int(11) NOT NULL,
  `state` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`username`, `password`, `email`, `role`, `state`, `createdAt`, `updatedAt`) VALUES
('dsdeffer', '$2a$10$98tVPUMnPcJVAtacuZ/yfuyn4zi5r.WsrBvr7rWA8v14td9lbkUa6', 'quanl2y@gmail.com', 2, 2, '2022-07-06 10:08:01', '2022-07-06 10:08:01'),
('fsdfs', '$2a$10$5V45dJ364/a3QQwiHwH/O.C2HitqXumUEHbRF92WCf.Tw48cVYRXO', 'khachhang@gmail.com', 2, 1, '2022-07-06 14:18:57', '2022-07-18 19:38:14'),
('fsdvdfvdff', '$2a$10$Hv7/msH1JyKDnfJJ.MQI5.Uki3t8l.RySkRgTfiX01wtYC69Wdukq', 'adm312n@gmail.com', 2, 2, '2022-07-06 10:14:01', '2022-07-06 10:14:01'),
('fsdvdnf', '$2a$10$98tVPUMnPcJVAtacuZ/yfuXbGcB2MpeiCJ3dHHeOM.D3TN7aobtTa', 'qua243nly@gmail.com', 2, 2, '2022-07-06 10:12:47', '2022-07-06 10:12:47'),
('gv01', '$2a$10$7e6.gALovtF2I.P5fPnV1OlpjUoUTzmH43hFCgGPsnthKe9hsU6A.', 'ntrungduc228@gmail.com', 0, 1, '2022-06-20 11:19:53', '2022-06-20 11:19:53'),
('gv02', '$2a$10$EoUgW.VmtMCSDWkxNZJeg.0O.AbzZm5LCj5EBUfyITxCz00BFapou', 'gv02@gmail.com', 1, 1, '2022-07-06 15:00:42', '2022-07-20 15:58:48'),
('gv03', '$2a$10$EA/pshoEWbVaEgJKW1uOOu9adcmqbsnK1X73JW/aDc9vM5KWPfpam', 'gv23@gmail.com', 1, 2, '2022-07-07 16:56:45', '2022-07-18 19:46:07'),
('hgfhdfg', '$2a$10$Hv7/msH1JyKDnfJJ.MQI5.XUeYeOfgFqUecp2d8kZL3I7AZRD5vOm', 'cu43omer@gmail.com', 2, 2, '2022-07-06 10:14:21', '2022-07-06 10:14:21'),
('n19dccn033', '$2a$10$GzJNFLmM/DLVe0EpH20pHuV4XQUBJ1YDCF/YOvRv/gyzGvR35XllW', 'mymemory2409@gmail.com', 2, 2, '2022-07-01 02:28:14', '2022-07-01 02:28:14'),
('n19dccn034', '$2a$10$rK4h1E8ZhEQtaBosjC3kWeYr/wQZYqNplH4xL.qo2dGrYsVcks2pC', 'n19dccn440@student.ptithcm.edu.vn', 2, 1, '2022-07-01 15:06:42', '2022-07-01 16:44:51'),
('n19dccn040', '$2a$10$ojDtuz3zY8/2Cmv3T1L4uemyPch.6PHutmqMhvNmGUWjarwBWtUZC', 'n19dccn040@student.ptithcm.edu.vn', 2, 1, '2022-06-29 02:46:59', '2022-07-20 01:47:02'),
('n19dccn043', '$2a$10$8C9kkoX4iWMkUJkTHUzdNe3eyN467lLGIm.gCVw/xTKUaYG5nG7oe', 'n19dccn043@student.ptithcm.edu.vn', 2, 0, '2022-07-06 11:05:51', '2022-07-06 14:18:08'),
('n19dccn044', '$2a$10$NcdZFRKH9KXykRP/PbNu2e0HmiiTBUI4nJyaES0pZ0wGIcJy31gxW', 'afdin@gmail.com', 2, 1, '2022-07-06 14:44:57', '2022-07-18 19:59:21'),
('n19dccn056', '$2a$10$pLtc0bgVyL22aixF0XEL8O8No.4Avi6If5fp3hgkp.N3j7KSZfUDa', 'quanly34@gmail.com', 2, 2, '2022-07-06 10:22:18', '2022-07-06 10:22:18'),
('n19dccn222', '$2a$10$98tVPUMnPcJVAtacuZ/yfu7ievE8jjhtUU/9mmDuZSmN1g1FlW7m2', 'longboro4567@yahoo.com.vn', 2, 2, '2022-07-06 09:55:55', '2022-07-06 09:55:55'),
('n19dccn223', '123123', 'n19dccn223@student.ptithcm.edu.vn', 2, 1, '2022-06-29 02:46:59', '2022-06-29 02:46:59'),
('n19dccn345', '$2a$10$98tVPUMnPcJVAtacuZ/yfuXeauLQQXiBkQP/QPPvIsJzJ1NoTQB9a', 'n19dccn345@student.ptithcm.edu.vn', 2, 1, '2022-07-06 10:00:34', '2022-07-07 16:45:48');

-- --------------------------------------------------------

--
-- Table structure for table `classes`
--

CREATE TABLE `classes` (
  `classId` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `classes`
--

INSERT INTO `classes` (`classId`, `name`, `createdAt`, `updatedAt`) VALUES
('D14CQCN01', 'Công nghệ thông tin 1 khóa 2014', '2022-07-01 15:00:02', '2022-07-04 15:44:24'),
('D15CQCN02', 'Công nghệ thông tin 2 khóa 2015', '2022-07-01 00:21:25', '2022-07-01 00:21:25'),
('d16cqcn01', 'cong nghe thong tin 1 khoa 2016', '2022-06-28 11:34:35', '2022-06-28 11:34:35'),
('d17cqcn01', 'cong nghe thong tin 1 khoa 2017', '2022-06-27 09:40:34', '2022-06-27 09:40:34'),
('d17cqcn05', 'fnvdcvvfd', '2022-06-29 00:47:39', '2022-07-05 07:00:30'),
('D18CQCN02', 'Công nghệ thông tin 2 khóa 2018', '2022-06-25 23:58:05', '2022-06-25 23:58:05'),
('d18cqmr02', 'marketing 2 khoa 2018', '2022-06-27 15:43:00', '2022-06-27 15:43:00'),
('d18cqmr03', 'marketing 3 khoa 2018', '2022-06-28 11:37:03', '2022-06-28 11:37:03'),
('D19CQCN01', 'Công nghệ thông tin 1 khóa 2019', '2022-06-23 22:53:51', '2022-06-30 21:51:28'),
('D19CQCN03', 'Công nghệ thông tin 3 khóa 2019', '2022-06-23 22:53:51', '2022-06-23 22:53:51'),
('dweds', 'alofd', '2022-06-29 00:59:10', '2022-06-29 00:59:10');

-- --------------------------------------------------------

--
-- Table structure for table `exams`
--

CREATE TABLE `exams` (
  `classId` varchar(255) NOT NULL,
  `subjectId` varchar(255) NOT NULL,
  `times` int(11) NOT NULL,
  `teacherId` varchar(255) NOT NULL,
  `timeExam` int(11) NOT NULL,
  `dateExam` date NOT NULL,
  `numOfEasy` int(11) NOT NULL,
  `numOfMedium` int(11) NOT NULL,
  `numOfHard` int(11) NOT NULL,
  `state` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `exams`
--

INSERT INTO `exams` (`classId`, `subjectId`, `times`, `teacherId`, `timeExam`, `dateExam`, `numOfEasy`, `numOfMedium`, `numOfHard`, `state`, `createdAt`, `updatedAt`) VALUES
('D14CQCN01', 'avcb', 1, 'gv02', 2, '2022-07-06', 2, 2, 2, 1, '2022-07-21 20:47:01', '2022-07-21 20:47:01'),
('D14CQCN01', 'avcb', 2, 'gv02', 2, '2022-07-07', 2, 2, 2, 1, '2022-07-21 15:42:20', '2022-07-21 15:42:20'),
('D15CQCN02', 'avcb', 1, 'gv02', 3, '2022-07-07', 3, 3, 3, 0, '2022-07-21 20:47:18', '2022-07-21 21:17:00'),
('D19CQCN03', 'avcb', 1, 'gv02', 30, '2022-07-10', 3, 3, 3, 1, '2022-07-10 15:23:05', '2022-07-10 15:23:05'),
('D19CQCN03', 'avcb', 3, 'gv02', 30, '2022-07-11', 3, 3, 3, 1, '2022-07-12 16:07:27', '2022-07-12 16:07:27'),
('D19CQCN03', 'avcb', 4, 'gv02', 30, '2022-07-11', 3, 3, 3, 1, '2022-07-12 16:14:34', '2022-07-12 16:14:34'),
('D19CQCN03', 'avcb', 5, 'gv02', 30, '2022-07-11', 3, 3, 3, 1, '2022-07-12 16:19:45', '2022-07-12 16:19:45'),
('D19CQCN03', 'avcb', 6, 'gv02', 30, '2022-07-11', 3, 3, 3, 1, '2022-07-12 16:31:57', '2022-07-12 16:31:57'),
('D19CQCN03', 'mmtcb', 1, 'gv02', 30, '2022-07-10', 3, 3, 3, 1, '2022-07-10 15:23:05', '2022-07-10 15:23:05'),
('dweds', 'avcb', 4, 'gv02', 2, '2022-07-06', 2, 2, 2, 1, '2022-07-21 20:52:38', '2022-07-21 20:52:38'),
('dweds', 'avcb', 5, 'gv02', 30, '2022-06-30', 3, 3, 3, 1, '2022-07-21 20:52:54', '2022-07-21 20:52:54');

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `questionId` int(11) NOT NULL,
  `content` varchar(255) NOT NULL,
  `subjectId` varchar(255) NOT NULL,
  `answerA` varchar(255) NOT NULL,
  `answerB` varchar(255) NOT NULL,
  `answerC` varchar(255) NOT NULL,
  `answerD` varchar(255) NOT NULL,
  `correctAnswer` varchar(255) NOT NULL,
  `level` int(11) NOT NULL,
  `teacherId` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`questionId`, `content`, `subjectId`, `answerA`, `answerB`, `answerC`, `answerD`, `correctAnswer`, `level`, `teacherId`, `createdAt`, `updatedAt`) VALUES
(13, 'để một máy tính truyền dữ liệu cho một số máy khác trong mạng, ta dùng loại địa chỉ', 'mmtcb', 'Broadcast', 'Broadband', 'multicast', 'multiple access', 'C', 0, 'gv02', '2022-07-10 15:21:41', '2022-07-10 15:21:41'),
(14, 'While you are in the building, please wear your identification badge at all times so that you are ....... as a company employee.', 'avcb', 'recognize', 'recognizing', 'recognizable', 'recognizably', 'C', 1, 'gv02', '2022-07-10 15:21:41', '2022-07-10 15:21:41'),
(15, 'asdasd', 'avcb', 'asd', 'SDfsdfsd', 'fsd', 'sdfbg', 'A', 0, 'gv02', '2022-07-12 16:19:14', '2022-07-12 16:19:14'),
(16, 'asd12asd', 'avcb', 'asd', 'SDfsdfsd', 'fsd', 'sdfbg', 'A', 0, 'gv02', '2022-07-12 16:19:25', '2022-07-12 16:19:25'),
(17, 'a5454d12asd', 'avcb', 'asd', 'SDfsdfsd', 'fsd', 'sdfbg', 'A', 0, 'gv02', '2022-07-12 16:19:28', '2022-07-12 16:19:28'),
(18, 'a5454432asd', 'avcb', 'asd', 'SDfsdfsd', 'fsd', 'sdfbg', 'A', 1, 'gv02', '2022-07-12 16:28:30', '2022-07-12 16:28:30'),
(19, 'a432asd', 'avcb', 'asd', 'SDfsdfsd', 'fsd', 'sdfbg', 'A', 1, 'gv02', '2022-07-12 16:31:18', '2022-07-12 16:31:18'),
(20, 'a4343sd', 'avcb', 'asd', 'SDfsdfsd', 'fsd', 'sdfbg', 'A', 2, 'gv02', '2022-07-12 16:31:37', '2022-07-12 16:31:37'),
(21, 'a4365sd', 'avcb', 'asd', 'SDfsdfsd', 'fsd', 'sdfbg', 'A', 2, 'gv02', '2022-07-12 16:31:48', '2022-07-12 16:31:48'),
(22, 'a4545sd', 'avcb', 'asd', 'SDfsdfsd', 'fsd', 'sdfbg', 'A', 2, 'gv02', '2022-07-12 16:31:51', '2022-07-12 16:31:51'),
(23, 'a45465d', 'avcb', 'asd', 'SDfsdfsd', 'fsd', 'sdfbg', 'A', 2, 'gv02', '2022-07-12 16:31:55', '2022-07-12 16:31:55');

-- --------------------------------------------------------

--
-- Table structure for table `scores`
--

CREATE TABLE `scores` (
  `studentId` varchar(255) NOT NULL,
  `subjectId` varchar(255) NOT NULL,
  `times` int(11) NOT NULL,
  `date` date NOT NULL,
  `score` float NOT NULL,
  `expiresAt` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `scores`
--

INSERT INTO `scores` (`studentId`, `subjectId`, `times`, `date`, `score`, `expiresAt`, `createdAt`, `updatedAt`) VALUES
('n19dccn040', 'avcb', 4, '2022-07-25', 10, '2022-07-25 17:06:16', '2022-07-25 16:36:16', '2022-07-25 16:37:02'),
('n19dccn040', 'avcb', 5, '2022-07-14', 2.22, '2022-07-15 00:24:33', '2022-07-14 23:54:33', '2022-07-16 11:50:47'),
('n19dccn040', 'avcb', 6, '2022-07-17', 0, '2022-07-17 10:26:16', '2022-07-17 09:56:16', '2022-07-17 09:56:31');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20220619161712-create-account.js'),
('20220620035138-create-class.js'),
('20220620040109-create-student.js'),
('20220620080457-create-teacher.js'),
('20220707101801-create-subject.js'),
('20220707105521-create-question.js'),
('20220707123536-create-exam.js'),
('20220707130045-create-score.js'),
('20220707131718-create-student-exam.js');

-- --------------------------------------------------------

--
-- Table structure for table `studentexams`
--

CREATE TABLE `studentexams` (
  `studentId` varchar(255) NOT NULL,
  `questionId` int(11) NOT NULL,
  `subjectId` varchar(255) NOT NULL,
  `times` int(11) NOT NULL,
  `answer` varchar(255) DEFAULT NULL,
  `number` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `studentId` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `classId` varchar(255) NOT NULL,
  `gender` tinyint(1) NOT NULL,
  `birthday` date DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`studentId`, `lastName`, `firstName`, `phone`, `classId`, `gender`, `birthday`, `createdAt`, `updatedAt`) VALUES
('dsdeffer', 'Nguyen', 'Davis', '0967434730', 'D19CQCN03', 1, '2022-06-28', '2022-07-06 10:08:01', '2022-07-06 10:08:01'),
('fsdfs', 'errev', 'dfvd', '0967354730', 'D14CQCN01', 0, '2022-06-28', '2022-07-06 14:18:57', '2022-07-06 14:18:57'),
('fsdvdfvdff', 'Nguyenfsd', 'Davisfdf', '09665724730', 'D18CQCN02', 1, '2022-06-28', '2022-07-06 10:14:01', '2022-07-06 10:14:01'),
('fsdvdnf', 'Nguyen432', 'Davis234', '0967526730', 'D18CQCN02', 1, '2022-07-04', '2022-07-06 10:12:47', '2022-07-06 10:12:47'),
('hgfhdfg', 'Nguyen', 'Davis', '0945724730', 'D18CQCN02', 0, '2022-07-04', '2022-07-06 10:14:21', '2022-07-06 10:14:21'),
('n19dccn033', 'huynh', 'duong', '0987654445', 'D19CQCN03', 1, '2001-08-22', '2022-07-01 02:28:14', '2022-07-01 02:28:14'),
('n19dccn034', 'duong update', 'ten update', '0843784384', 'D19CQCN03', 1, '2002-08-22', '2022-07-01 15:06:42', '2022-07-19 20:56:16'),
('n19dccn040', 'Nguyễn Trung', 'Đức', '0967727720', 'D19CQCN03', 1, '2001-08-22', '2022-06-29 03:08:20', '2022-07-20 22:31:28'),
('n19dccn043', 'sinh vienm32', 'moi update1', '0967724733', 'D19CQCN01', 1, '2022-06-27', '2022-07-06 11:05:51', '2022-07-06 14:18:25'),
('n19dccn044', 'Nguyen', 'Davis', '094224730', 'd18cqmr03', 0, '2022-05-04', '2022-07-06 14:44:57', '2022-07-06 23:02:42'),
('n19dccn056', 'Nguyenupdate', 'Davis updatee', '0967724720', 'D19CQCN03', 0, '2022-06-05', '2022-07-06 10:22:18', '2022-07-06 10:50:34'),
('n19dccn222', 'Nguyennn', 'Duccc', '0967724745', 'D18CQCN02', 1, '2022-07-05', '2022-07-06 09:55:55', '2022-07-06 09:55:55'),
('n19dccn223', 'Nguyễn Thị Khánh', 'Vi', '0932312807', 'D19CQCN03', 0, '2001-04-29', '2022-06-29 03:08:20', '2022-06-29 03:08:20'),
('n19dccn345', 'ho', 'tênn', '0967743566', 'D14CQCN01', 1, '2022-07-05', '2022-07-06 10:00:34', '2022-07-06 10:00:34');

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `subjectId` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`subjectId`, `name`, `createdAt`, `updatedAt`) VALUES
('avcb', 'Anh văn căn bản', '2022-07-07 20:34:53', '2022-07-07 20:34:53'),
('mmtcb', 'Mạng máy tính', '2022-07-07 20:34:53', '2022-07-07 20:34:53'),
('thcs1', 'Tin học cơ sở 1', '2022-07-22 21:38:30', '2022-07-22 21:38:30');

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `teacherId` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `gender` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`teacherId`, `lastName`, `firstName`, `phone`, `gender`, `createdAt`, `updatedAt`) VALUES
('gv01', 'Nguyễn Trung', 'Đức', '0967723729', 1, '2022-06-20 11:28:07', '2022-07-23 01:10:46'),
('gv02', 'duong uddate', 'ten u12', '08412344384', 1, '2022-07-06 15:00:42', '2022-07-20 16:13:34'),
('gv03', 'Nguyen update', 'Davisss', '0967464730', 0, '2022-07-07 16:56:45', '2022-07-07 17:03:21');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`classId`);

--
-- Indexes for table `exams`
--
ALTER TABLE `exams`
  ADD PRIMARY KEY (`classId`,`subjectId`,`times`),
  ADD KEY `subjectId` (`subjectId`),
  ADD KEY `teacherId` (`teacherId`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`questionId`),
  ADD KEY `subjectId` (`subjectId`),
  ADD KEY `teacherId` (`teacherId`);

--
-- Indexes for table `scores`
--
ALTER TABLE `scores`
  ADD PRIMARY KEY (`studentId`,`subjectId`,`times`),
  ADD KEY `subjectId` (`subjectId`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `studentexams`
--
ALTER TABLE `studentexams`
  ADD PRIMARY KEY (`studentId`,`questionId`,`subjectId`),
  ADD KEY `questionId` (`questionId`),
  ADD KEY `subjectId` (`subjectId`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`studentId`),
  ADD KEY `classId` (`classId`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`subjectId`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`teacherId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `questionId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `exams`
--
ALTER TABLE `exams`
  ADD CONSTRAINT `exams_ibfk_1` FOREIGN KEY (`classId`) REFERENCES `classes` (`classId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `exams_ibfk_2` FOREIGN KEY (`subjectId`) REFERENCES `subjects` (`subjectId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `exams_ibfk_3` FOREIGN KEY (`teacherId`) REFERENCES `teachers` (`teacherId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`subjectId`) REFERENCES `subjects` (`subjectId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `questions_ibfk_2` FOREIGN KEY (`teacherId`) REFERENCES `teachers` (`teacherId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `scores`
--
ALTER TABLE `scores`
  ADD CONSTRAINT `scores_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `students` (`studentId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `scores_ibfk_2` FOREIGN KEY (`subjectId`) REFERENCES `subjects` (`subjectId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `studentexams`
--
ALTER TABLE `studentexams`
  ADD CONSTRAINT `studentexams_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `students` (`studentId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentexams_ibfk_2` FOREIGN KEY (`questionId`) REFERENCES `questions` (`questionId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentexams_ibfk_3` FOREIGN KEY (`subjectId`) REFERENCES `subjects` (`subjectId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `accounts` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `students_ibfk_2` FOREIGN KEY (`classId`) REFERENCES `classes` (`classId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `teachers`
--
ALTER TABLE `teachers`
  ADD CONSTRAINT `teachers_ibfk_1` FOREIGN KEY (`teacherId`) REFERENCES `accounts` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
