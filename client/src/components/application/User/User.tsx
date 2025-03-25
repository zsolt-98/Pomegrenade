import Input from "@/components/global/shared/Input";
import { Button } from "@/components/ui/button";
import { AppContext } from "@/context/AppContext";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Camera, CircleUserRound, Loader2 } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { updatePersonalInfoSchema } from "./schemas/UpdatePersonalInfoSchema";

export default function User() {
  const { isLoggedin, isAuthLoading, userData, setUserData } =
    useContext(AppContext);
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContext);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isFetchingPhoto, setIsFetchingPhoto] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isUpdatingPersonalInfo, setIsUpdatingPersonalInfo] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    formState: { errors },
    setValue,
    trigger,
  } = useForm({
    resolver: yupResolver(updatePersonalInfoSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
    },
  });

  useEffect(() => {
    if (userData) {
      setName(userData.name);
      setEmail(userData.email);
      setValue("name", userData.name);
      setValue("email", userData.email);
    }
  }, [userData, setValue]);

  useEffect(() => {
    const fetchProfilePhoto = async () => {
      setIsFetchingPhoto(true);
      try {
        const { data } = await axios.get(
          `${backendUrl}/api/user/profile-photo`,
        );
        if (data.success && data.profilePhoto) {
          setProfilePhotoUrl(data.profilePhoto);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsFetchingPhoto(false);
      }
    };

    if (!isAuthLoading && !isLoggedin) {
      navigate("/login");
    } else if (isLoggedin) {
      fetchProfilePhoto();
    }
  }, [isAuthLoading, isLoggedin, navigate, backendUrl]);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    try {
      setIsUploading(true);
      const base64 = await fileToBase64(file);

      const { data } = await axios.post(
        `${backendUrl}/api/user/profile-photo`,
        { image: base64, fileType: file.type },
      );

      if (data.success) {
        setProfilePhotoUrl(base64);
        toast.success("Profile photo updated successfully");
      } else {
        toast.error(data.message || "Failed to upload profile photo");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error has occurred.");
    } finally {
      setIsUploading(false);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    setValue("name", value);
    trigger("name");
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setValue("email", value);
    trigger("email");
  };

  const handleUpdatePersonalInfo = async () => {
    const isValid = await trigger();
    if (!isValid) return;

    try {
      setIsUpdatingPersonalInfo(true);
      const { data } = await axios.post(
        `${backendUrl}/api/user/update-personal-info`,
        {
          name,
          email,
        },
      );

      if (data.success) {
        setUserData(data.userData);
        toast.success(data.message);
      } else {
        toast.error(data.message || "Failed to update personal information");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error has occurred.");
    } finally {
      setIsUpdatingPersonalInfo(false);
    }
  };

  const handleResetPassword = async () => {
    try {
      if (userData) {
        const { data } = await axios.post(
          `${backendUrl}/api/auth/send-reset-otp`,
          { email: userData.email },
        );
        if (data.success) {
          toast.success(data.message);
          navigate("/reset-password");
        } else {
          toast.error(data.message || "Failed to send verification code");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while sending the verification code");
    }
  };

  return (
    <main className="bg-tertiary-light relative flex w-full items-center justify-center overflow-hidden">
      <div className="container mx-auto flex max-w-7xl flex-col items-center px-5 2xl:px-0">
        <div className="my-20 flex w-full flex-col gap-5">
          <div className="rounded-4xl border-tertiary bg-secondary-light h-100 flex items-center justify-around gap-10 border-2 px-20 py-10 max-lg:h-auto max-lg:flex-col max-lg:p-5">
            <div className="flex flex-col items-center gap-5">
              <div className="w-50 h-50 border-tertiary bg-tertiary-light relative rounded-full border-2">
                {isFetchingPhoto && (
                  <Loader2 className="text-primary-1 absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 animate-spin rounded-full" />
                )}
                {!profilePhotoUrl && !isFetchingPhoto && (
                  <CircleUserRound
                    className="stroke-tertiary absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    strokeWidth={0.22}
                    size={237}
                  />
                )}
                {profilePhotoUrl && (
                  <>
                    <img
                      src={profilePhotoUrl}
                      alt="Profile photo"
                      className="h-full w-full rounded-full object-cover"
                    />
                  </>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  className="border-tertiary bg-secondary-light right hover:bg-tertiary group absolute bottom-1 right-5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2"
                  onClick={handleUploadClick}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <Loader2 className="text-tertiary h-5 w-5 animate-spin" />
                  ) : (
                    <Camera className="stroke-tertiary group-hover:stroke-secondary-light" />
                  )}
                </button>
              </div>
              <div className="bg-tertiary h-[2px] w-full max-xl:h-[1px]"></div>
              <div className="[&>a]:hover:text-primary-1 text-tertiary flex flex-col font-medium">
                <a className="">About us</a>
                <a className="">Contact us</a>
                <a className="">Help center</a>
              </div>
            </div>
            <div className="bg-tertiary max-lg:h-[1px] max-lg:w-full lg:h-full lg:w-[1px] xl:w-[2px]"></div>
            <div className="text-primary-1 max-sm:w-w-60 flex h-full w-80 flex-col justify-between">
              <h3 className="text-2xl font-semibold">Personal information</h3>
              <div className="flex w-full flex-col">
                <div className="w-full">
                  <p className="font-medium">First name:</p>
                  <Input
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    error={errors.name?.message}
                  />
                </div>
                <div className="mt-5">
                  <p className="font-medium">Email:</p>
                  <Input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    error={errors.email?.message}
                  />
                </div>
                <div className="mt-5 flex justify-end gap-2">
                  <Button
                    type="button"
                    className="border-tertiary hover:bg-tertiary text-tertiary hover:text-secondary-light rounded-full border-2 bg-transparent text-sm font-medium"
                    onClick={handleUpdatePersonalInfo}
                    disabled={
                      isUpdatingPersonalInfo || !!errors.name || !!errors.email
                    }
                  >
                    {isUpdatingPersonalInfo ? "Saving..." : "Save changes"}
                  </Button>
                </div>
              </div>
            </div>
            <div className="bg-tertiary max-lg:h-[1px] max-lg:w-full lg:h-full lg:w-[1px] xl:w-[2px]"></div>

            <div className="text-primary-1 flex h-full w-80 flex-col justify-between gap-10 max-sm:w-60">
              <h3 className="text-2xl font-semibold">Password</h3>
              <div className="">
                <p className="font-medium">Password:</p>
                <Input type="password" placeholder="************" disabled />
                <div className="flex justify-end">
                  <Button
                    className="border-tertiary hover:bg-tertiary text-tertiary hover:text-secondary-light mt-5 rounded-full border-2 bg-transparent text-sm font-medium"
                    onClick={handleResetPassword}
                  >
                    Reset password
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
