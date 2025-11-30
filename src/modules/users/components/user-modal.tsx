import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { User } from "../types/user.types";
import { createUserSchema, updateUserSchema, type CreateUserFormData, type UpdateUserFormData } from "../schemas/user.schema";
import { useCreateUser, useUpdateUser } from "../hooks/use-users";
import { Modal, ModalFooter } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { FormWrapper } from "@/components/form/form-wrapper";
import { FormFieldInput, FormFieldSelect } from "@/components/form/form-field-wrapper";

interface UserModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

export const UserModal = ({ user, isOpen, onClose }: UserModalProps) => {
  const isEditMode = !!user;
  const { mutate: createUser, isPending: isCreating } = useCreateUser();
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();

  const form = useForm<CreateUserFormData | UpdateUserFormData>({
    resolver: zodResolver(isEditMode ? updateUserSchema : createUserSchema),
    defaultValues: isEditMode
      ? {
          name: user?.name || "",
          email: user?.email || "",
          role: user?.role || "user",
          status: user?.status || "active",
        }
      : {
          name: "",
          email: "",
          password: "",
          role: "user",
        },
  });

  const isPending = isCreating || isUpdating;

  const onSubmit = (data: CreateUserFormData | UpdateUserFormData) => {
    if (isEditMode) {
      updateUser(
        {
          id: user.id,
          data: data as UpdateUserFormData,
        },
        {
          onSuccess: () => {
            onClose();
            form.reset();
          },
          onError: (err: Error) => {
            form.setError("root", {
              message: err.message || "Failed to update user",
            });
          },
        }
      );
    } else {
      createUser(data as CreateUserFormData, {
        onSuccess: () => {
          onClose();
          form.reset();
        },
        onError: (err: Error) => {
          form.setError("root", {
            message: err.message || "Failed to create user",
          });
        },
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? "Edit User" : "Create User"}
      size="md"
      key={user?.id || "new"}
    >
      <FormWrapper form={form} onSubmit={onSubmit} className="space-y-4">
        <FormFieldInput
          name="name"
          label="Name"
          type="text"
          placeholder="Enter user name"
          required
        />

        <FormFieldInput
          name="email"
          label="Email"
          type="email"
          placeholder="Enter user email"
          required
        />

        {!isEditMode && (
          <FormFieldInput
            name="password"
            label="Password"
            type="password"
            placeholder="Enter password"
            required
          />
        )}

        <FormFieldSelect
          name="role"
          label="Role"
          options={[
            { value: "user", label: "User" },
            { value: "admin", label: "Admin" },
          ]}
          required
        />

        {isEditMode && (
          <FormFieldSelect
            name="status"
            label="Status"
            options={[
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
            ]}
            required
          />
        )}

        <ModalFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : isEditMode ? "Update" : "Create"}
          </Button>
        </ModalFooter>
      </FormWrapper>
    </Modal>
  );
};

