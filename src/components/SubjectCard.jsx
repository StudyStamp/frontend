import React from "react";
import {
    Box,
    CircularProgress,
    CircularProgressLabel,
    HStack,
    IconButton,
    Spacer,
    Text
} from "@chakra-ui/react";
import { CheckIcon, EditIcon, SmallCloseIcon } from "@chakra-ui/icons";

const getStatus = (present, total, goal) => {
    const attendancePercentage = (present / total) * 100;
    const attendancePercentageRounded = parseFloat(attendancePercentage.toFixed(1));
    const attendanceGoalRounded = parseFloat(goal.toFixed(1));
    
    if(attendancePercentageRounded > attendanceGoalRounded){
        let x = ((present * 100) - (total * goal)) / goal;
        if(Math.floor(x) === 0){
            return ("On track, do not miss the next class");
        } else if(Math.floor(x) === 1){
            return ("On track, you can bunk the next class");
        } else {
            return (`On track, you can bunk next ${Math.floor(x)} classes`);
        }
    } else if (attendancePercentageRounded < attendanceGoalRounded){
        let x = ((present * 100) - (total * goal))/ (goal - 100);
        if(Math.floor(x) > 1){
            return (`Attend next ${x} classes to get back on track`);
        } else {
            return ("Attend next class to get back on track");
        }
    } else {
        return ("On track, do not miss the next class.")
    }
}

const SubjectCard = ({ subject, handleToEditOpen, goal }) => {
    const attendancePercentage = (subject.present / subject.total) * 100;
    const attendancePercentageRounded = parseFloat(attendancePercentage.toFixed(1));
    const attendanceGoalRounded = parseFloat(goal.toFixed(1));
    const isLow = attendancePercentageRounded < attendanceGoalRounded;

    const { name, present, total, schedule } = subject;

    return (
        <Box
            borderWidth="1px"
            borderRadius="lg"
            padding="4"
            boxShadow="base"
        >
            <HStack mb="2">
                <Text fontWeight="bold" fontSize="xl" marginBottom="2">
                    {name}
                </Text>
                <Spacer />
                <IconButton
                    icon={<EditIcon />}
                    bg="transparent"
                    isRound
                    onClick={() => handleToEditOpen(subject)}
                />
            </HStack>
            <HStack mb="2">
                <HStack>
                    <Text fontWeight="bold" fontSize="sm" color="gray">
                        Attendance:
                    </Text>
                    <Text fontWeight="bold">
                        {present} / {total}
                    </Text>
                </HStack>
                <Spacer />
                <HStack>
                    <CircularProgress value={attendancePercentageRounded} color={isLow ? 'red.400' : 'green.400'}>
                        <CircularProgressLabel fontWeight="bold">{attendancePercentageRounded}{"%"}</CircularProgressLabel>
                    </CircularProgress>
                </HStack>
            </HStack>
            <HStack>
                <Text fontSize="sm" color="gray" fontStyle="italic">
                    <Text fontWeight="bold" color="black" display="inline-block">Status:</Text>{" "}{getStatus(subject.present, subject.total, goal)}
                </Text>
                <Spacer />
                <HStack>
                    <IconButton
                        icon={<CheckIcon />}
                        size="sm"
                        colorScheme="green"
                        isRound
                    />
                    <IconButton
                        icon={<SmallCloseIcon />}
                        size="sm"
                        colorScheme="red"
                        isRound
                    />
                </HStack>
            </HStack>
        </Box>
    );
};

export default SubjectCard;
