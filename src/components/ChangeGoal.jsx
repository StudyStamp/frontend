import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
    Spinner,
} from '@chakra-ui/react';
import React from 'react';

const ChangeGoal = ({
    goalIsOpen,
    goalOnClose,
    goalOnOpen,
    sliderValue,
    setSliderValue,
    handleGoalClose,
    handleGoalSave,
    goalLoading,
    setGoalLoading,
}) => {
    return(
        <>
            <Modal isOpen={goalIsOpen} onClose={handleGoalClose} closeOnOverlayClick={false}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Minimum required attendance</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text textAlign="center" fontWeight="bold" fontSize="2rem">{sliderValue}%</Text>
                        <Slider defaultValue={sliderValue} min={0} max={100} step={5} onChange={(val) => setSliderValue(val)}>
                            <SliderTrack bg='red.100'>
                                <Box position='relative' right={10} />
                                <SliderFilledTrack bg='tomato' />
                            </SliderTrack>
                            <SliderThumb boxSize={6} />
                        </Slider>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleGoalSave}>
                            {goalLoading ? <Spinner /> : "Save"}
                        </Button>
                        <Button variant='ghost' onClick={handleGoalClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ChangeGoal;