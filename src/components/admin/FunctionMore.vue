<template>
    <div class="text-center">
        <h1>การจัดการฟังก์ชั่นเพิ่มเติม</h1>
    </div>
    <div class="grid">
        <div class="col-12 lg:col-4" v-for="item in item_function" :key="item">
            <div class="surface-section shadow-2 p-5 mt-2">
                <div class="font-medium text-3xl text-900 mb-3">
                    {{ item.func_topic }}
                </div>
                <div class="text-500 mb-5">
                    {{ item.func_discription }}
                </div>
                <div class="w-full md:w-8 md:flex-order-0 flex-order-1">
                    <Tag class="mb-2 bg-blue-100 text-blue-600" :value="item.func_type"></Tag>
                </div>
                <li class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap"></li>
                <div class="grid">
                    <div class="col">
                        <Button label="Edit" icon="pi pi-pencil" class="p-button-outlined w-full"
                            @click="openDialog(item)"></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- DialogUpdate -->
    <Dialog header="รายละเอียดฟั่งก์ชั่น" v-model:visible="displayUpdate"
        :breakpoints="{ '960px': '75vw', '640px': '90vw' }" :style="{ width: '700px' }" :modal="true" class="p-fluid">
        <div class="field">
            <label for="func_topic">Topic</label>
            <InputText id="func_topic" v-model="datail_function.func_topic" autofocus />
        </div>
        <div class="field">
            <label for="description">Description</label>
            <div> 
                <Textarea id="description" v-model="datail_function.func_discription" rows="3" cols="20" />
            </div>
        </div>
        <div class="field">
            <label for="func_type" class="mb-3">Type</label>
            <Dropdown id="func_type" v-model="datail_function.func_type" :options="type" optionLabel="name"
                optionValue="code" placeholder="เลือกประเภทของฟังก์ชั่น">
            </Dropdown>
        </div>
        <div class="field">
            <label for="func_detail">Detail</label>
            <div v-if="datail_function.func_type === 'text'">
                <Textarea id="func_detail" v-model="datail_function.func_detail" rows="5" cols="20" />
            </div>
            <div v-else-if="datail_function.func_type === 'image'">
                <div v-for="item in datail_function.func_detail" :key="item">
                    <div class="card">
                        <div class="relative card-container green-container">
                            <div class="relative">
                                <Image :src="img + item" width="640" />
                                <div
                                    class="absolute top-0 right-0 font-bold flex align-items-center justify-content-center w-4rem h-4rem border-round">
                                    <Button class="p-button-rounded p-button-danger" icon="pi pi-times"
                                        style="font-size: 2rem" @click="deleteimg(item)" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <FileUpload name="img[]" :customUpload="true" :multiple="true" chooseLabel="เลือกไฟล์" uploadLabel="ตกลง"
                    cancelLabel="ยกเลิก" uploadIcon="pi pi-check" @uploader="add_img"
                    accept="image/jpg,image/png, image/jpeg" invalidFileLimitMessage="สามารถเลือกได้ไฟล์เดียวเท่านั้น"
                    invalidFileSizeMessage="ไฟล์จะต้องขนาดไม่เกิน 5 MB เท่านั้น" :maxFileSize="5242880">
                    <template #empty>
                        <p>Drag and drop files to here to upload.</p>
                    </template>
                </FileUpload>
            </div>
        </div>

        <template #footer>
            <Button label="No" icon="pi pi-times" @click="closeDialog" class="p-button-text" />
            <Button label="Yes" icon="pi pi-check" autofocus @click="edit_function" />
        </template>
    </Dialog>

    <!-- DialogAdd -->
    <Dialog header="เพิ่มฟั่งก์ชั่น" v-model:visible="displayAdd" :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
        :style="{ width: '700px' }" :modal="true" class="p-fluid">
        <div class="field">
            <label for="func_topic">Topic</label>
            <InputText id="func_topic" v-model="data_function.func_topic" autofocus />
        </div>
        <div class="field">
            <label for="func_name">Function Name</label>
            <InputText id="func_name" v-model="data_function.func_name" autofocus />
        </div>
        <div class="field">
            <label for="description">Description</label>
            <Textarea id="description" v-model="data_function.func_discription" rows="3" cols="20" />
        </div>
        <div class="field">
            <label for="func_type" class="mb-3">Type</label>
            <Dropdown id="func_type" v-model="data_function.func_type" :options="type" optionLabel="name" optionValue="code"
                placeholder="เลือกประเภทของฟังก์ชั่น">
            </Dropdown>
        </div>
        <div class="field">
            <label for="func_detail">Detail</label>
            <div v-if="data_function.func_type === 'text'">
                <Textarea id="func_detail" v-model="detail" rows="5" cols="20" />
            </div>
            <div v-else-if="data_function.func_type === 'image'">
                <FileUpload name="image[]" url="https://www.primefaces.org/upload.php" @upload="add_img" :multiple="true"
                    accept="image/jpg,image/png, image/jpeg" :maxFileSize="1000000" chooseLabel="เลือกไฟล์"
                    uploadLabel="ตกลง" cancelLabel="ยกเลิก" uploadIcon="pi pi-check" :customUpload="true">
                    <template #empty>
                        <p>Drag and drop files to here to upload.</p>
                    </template>
                </FileUpload>
            </div>
        </div>

        <template #footer>
            <Button label="No" icon="pi pi-times" @click="closeDialog" class="p-button-text" />
            <Button label="Yes" icon="pi pi-check" autofocus @click="add_function" />
        </template>
    </Dialog>
</template>
<script>
import axios from "axios";
import { ref } from "vue";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
export default {
    setup() {
        const confirm = useConfirm();
        const toast = useToast();
        const item_function = ref([]);
        const displayUpdate = ref(false);
        const displayAdd = ref(false);
        const datail_function = ref({});
        const img = ref("https://drive.google.com/uc?export=view&id=");
        const type = ref([
            { name: "Text", code: "text" },
            { name: "Image", code: "image" },
        ]);
        const detail = ref([]);
        const data_function = ref({
            func_type: "",
            func_topic: "",
            func_name: "",
            func_discription: "",
            func_detail: [],
        });
        const img_detail = ref([]);
        const getFunction = async () => {
            await axios
                .get(`${process.env.VUE_APP_DEKRUP}/more/function_more`, {
                    headers: {
                        "token": localStorage.getItem("token"),
                    },
                })
                .then((res) => {
                    item_function.value = res.data.data;
                })
                .catch((err) => {
                    if (err.response.status === 408) {
                        window.location.reload();
                    }
                });
        };
        const openDialog = (item) => {
            displayUpdate.value = true;
            datail_function.value = item;
        };
        const closeDialog = () => {
            displayUpdate.value = false;
            displayAdd.value = false;
        };
        const openDialog_add = () => {
            displayAdd.value = true;
        };
        const add_function = () => {
            if (data_function.value.func_type === "text") {
                data_function.value.func_detail.push(detail.value);
                confirm.require({
                    message: "คุณต้องการเพิ่มฟังก์ชั่นเพิ่มเติมนี้ ?",
                    header: "ยืนยัน",
                    icon: "pi pi-exclamation-triangle",
                    accept: async () => {
                        await axios
                            .post(
                                `${process.env.VUE_APP_SHOP}more/function_more`,
                                {
                                    func_type: data_function.value.func_type,
                                    func_topic: data_function.value.func_topic,
                                    func_name: data_function.value.func_name,
                                    func_discription: data_function.value.func_discription,
                                    func_detail: data_function.value.func_detail,
                                },
                                {
                                    headers: {
                                        "auth-token": localStorage.getItem("token"),
                                    },
                                }
                            )
                            .then(() => {
                                toast.add({
                                    severity: "success",
                                    summary: "สำเร็จ",
                                    detail: "เพิ่มฟังก์ชั่นเพิ่มเติมสำเร็จ",
                                    life: 3000,
                                });
                                displayAdd.value = false;
                                getFunction();
                            })
                            .catch((err) => {
                                if (err.response.status === 408) {
                                    window.location.reload();
                                    toast.add({
                                        severity: "error",
                                        summary: "ผิดพลาด",
                                        detail: err.response.data.message,
                                        life: 3000,
                                    });
                                }
                            });
                    },
                });
            } else if (data_function.value.func_type === "image") {
                data_function.value.func_detail.push(1321);
                confirm.require({
                    message: "คุณต้องการเพิ่มฟังก์ชั่นเพิ่มเติมนี้ ?",
                    header: "ยืนยัน",
                    icon: "pi pi-exclamation-triangle",
                    accept: async () => {
                        await axios
                            .post(
                                `${process.env.VUE_APP_SHOP}more/function_more`,
                                {
                                    func_type: data_function.value.func_type,
                                    func_topic: data_function.value.func_topic,
                                    func_name: data_function.value.func_name,
                                    func_discription: data_function.value.func_discription,
                                    func_detail: data_function.value.func_detail,
                                },
                                {
                                    headers: {
                                        "auth-token": localStorage.getItem("token"),
                                    },
                                }
                            )
                            .then(() => {
                                toast.add({
                                    severity: "success",
                                    summary: "สำเร็จ",
                                    detail: "เพิ่มฟังก์ชั่นเพิ่มเติมสำเร็จ",
                                    life: 3000,
                                });
                                displayAdd.value = false;
                                getFunction();
                            })
                            .catch((err) => {
                                if (err.response.status === 408) {
                                    window.location.reload();
                                    toast.add({
                                        severity: "error",
                                        summary: "ผิดพลาด",
                                        detail: err.response.data.message,
                                        life: 3000,
                                    });
                                }
                            });
                    },
                });
            }
        };
        const edit_function = () => {
            if (datail_function.value.func_type === "text") {
                confirm.require({
                    message: "คุณต้องการแก้ไขฟังก์ชั่นเพิ่มเติมนี้ ?",
                    header: "ยืนยันการแก้ไข",
                    icon: "pi pi-exclamation-triangle",
                    accept: async () => {
                        await axios
                            .put(
                                `${process.env.VUE_APP_DEKRUP}/more/function_more/${datail_function.value._id}`,
                                {
                                    func_type: datail_function.value.func_type,
                                    func_topic: datail_function.value.func_topic,
                                    func_discription: datail_function.value.func_discription,
                                    func_detail: datail_function.value.func_detail,
                                },
                                {
                                    headers: {
                                        "token": localStorage.getItem("token"),
                                    },
                                }
                            )
                            .then(() => {
                                toast.add({
                                    severity: "success",
                                    summary: "สำเร็จ",
                                    detail: "แก้ไขฟังก์ชั่นเพิ่มเติมสำเร็จ",
                                    life: 3000,
                                });
                                displayUpdate.value = false;
                                getFunction();
                            })
                            .catch((err) => {
                                if (err.response.status === 408) {
                                    window.location.reload();
                                    toast.add({
                                        severity: "error",
                                        summary: "ผิดพลาด",
                                        detail: err.response.data.message,
                                        life: 3000,
                                    });
                                }
                            });
                    },
                });
            } else if (datail_function.value.func_type === "image") {
                confirm.require({
                    message: "คุณต้องการแก้ไขฟังก์ชั่นเพิ่มเติมนี้ ?",
                    header: "ยืนยันการแก้ไข",
                    icon: "pi pi-exclamation-triangle",
                    accept: async () => {
                        await axios
                            .put(
                                `${process.env.VUE_APP_DEKRUP}/more/function_more/${datail_function.value._id}`,
                                {
                                    func_type: datail_function.value.func_type,
                                    func_topic: datail_function.value.func_topic,
                                    func_discription: datail_function.value.func_discription,
                                },
                                {
                                    headers: {
                                        "token": localStorage.getItem("token"),
                                    },
                                }
                            )
                            .then(() => {
                                toast.add({
                                    severity: "success",
                                    summary: "สำเร็จ",
                                    detail: "แก้ไขฟังก์ชั่นเพิ่มเติมสำเร็จ",
                                    life: 3000,
                                });
                                displayUpdate.value = false;
                                getFunction();
                            })
                            .catch((err) => {
                                if (err.response.status === 408) {
                                    window.location.reload();
                                    toast.add({
                                        severity: "error",
                                        summary: "ผิดพลาด",
                                        detail: err.response.data.message,
                                        life: 3000,
                                    });
                                }
                            });
                    },
                });
            }
        };
        const deleteimg = (item) => {
            let index;
            for (let i in datail_function.value.func_detail) {
                if (datail_function.value.func_detail[i] === item) {
                    index = i;
                    break;
                }
            }
            confirm.require({
                message: "คุณต้องการลบรูปภาพนี้หรือไม่ ?",
                header: "ยืนยันการลบ",
                icon: "pi pi-info-circle",
                acceptClass: "p-button-danger",
                accept: async () => {
                    datail_function.value.func_detail.splice(index, 1);
                    await axios
                        .delete(`${process.env.VUE_APP_SHOP}delete/image/${item}`, {
                            headers: {
                                "auth-token": localStorage.getItem("token"),
                            },
                        })
                        .then(() => {
                            axios
                                .put(
                                    `${process.env.VUE_APP_SHOP}more/function_more/${datail_function.value._id}`,
                                    { func_detail: datail_function.value.func_detail },
                                    {
                                        headers: {
                                            "auth-token": localStorage.getItem("token"),
                                        },
                                    }
                                )
                                .then(() => {
                                    toast.add({
                                        severity: "success",
                                        summary: "สำเร็จ",
                                        detail: "ลบรูปภาสำเร็จ",
                                        life: 3000,
                                    });
                                });
                        })
                        .catch((err) => {
                            if (err.response.status === 408) {
                                window.location.reload();
                            }
                            toast.add({
                                severity: "error",
                                summary: "ผิดพลาด",
                                detail: err.response.data.message,
                                life: 3000,
                            });
                        });
                },
            });
        };
        const add_img = async (event) => {
            img_detail.value = event.files;
            const formData = new FormData();
            const new_img_detail = img_detail.value.map((item) => item);
            for (let i = 0; i < new_img_detail.length; i++) {
                formData.append("imgCollection", img_detail.value[i]);
            }
            await axios
                .post(`${process.env.VUE_APP_DEKRUP}/image/collection`, formData, {
                    headers: {
                        "auth-token": localStorage.getItem("token"),
                    },
                })
                .then((res) => {
                    const name_img = res.data.file;
                    for (let i = 0; i < name_img.length; i++) {
                        datail_function.value.func_detail.push(name_img[i]);
                    }
                    axios
                        .put(
                            `${process.env.VUE_APP_SHOP}more/function_more/${datail_function.value._id}`,
                            { func_detail: datail_function.value.func_detail },
                            {
                                headers: {
                                    "auth-token": localStorage.getItem("token"),
                                },
                            }
                        )
                        .then(() => {
                            toast.add({
                                severity: "success",
                                summary: "สำเร็จ",
                                detail: "เพิ่มรูปภาสำเร็จ",
                                life: 3000,
                            });
                        })
                        .catch((err) => {
                            if (err.response.status === 408) {
                                window.location.reload();
                            }
                            toast.add({
                                severity: "error",
                                summary: "ผิดพลาด",
                                detail: err.response.data.message,
                                life: 3000,
                            });
                        });
                })
                .catch((err) => {
                    if (err.response.status === 408) {
                        window.location.reload();
                    }
                    toast.add({
                        severity: "error",
                        summary: "ผิดพลาด",
                        detail: err.response.data.message,
                        life: 3000,
                    });
                });
        };

        return {
            getFunction,
            openDialog,
            closeDialog,
            openDialog_add,
            add_function,
            edit_function,
            deleteimg,
            add_img,
            item_function,
            displayUpdate,
            displayAdd,
            datail_function,
            data_function,
            detail,
            type,
            img,
        };
    },
    mounted() {
        this.getFunction();
    },
};
</script>
<style lang=""></style>
  