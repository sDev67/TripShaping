import React from "react";
import { Text } from "react-native";
import { Collapse, Alert, VStack, HStack, IconButton, CloseIcon } from "native-base";

const AlertError = ({ showAlert, setShowAlert, alertMessage }) => {
    return (
        <Collapse isOpen={showAlert}>
            <Alert status="error">
                <VStack space={2} flexShrink={1}>
                    <HStack flexShrink={1} space={2} justifyContent="space-between">
                        <HStack space={2} flexShrink={1}>
                            <Alert.Icon mt="1" />
                            <Text fontSize="md" color="coolGray.800">
                                {alertMessage}
                            </Text>
                        </HStack>
                        <IconButton
                            variant="unstyled"
                            icon={<CloseIcon size="3" color="coolGray.600" />}
                            onPress={() => setShowAlert(false)}
                        />
                    </HStack>
                </VStack>
            </Alert>
        </Collapse>
    )
};

export default AlertError;
